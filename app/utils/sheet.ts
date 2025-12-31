import { google, sheets_v4 } from "googleapis";

class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private spreadsheetId: string;

  constructor() {
    // Initialize Google Sheets client
    const credentials = {
      type: "service_account",
      project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
      private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.GOOGLE_SHEETS_CLIENT_CERT_URL,
    };

    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "";

    if (!this.spreadsheetId) {
      throw new Error("Google Sheets spreadsheet ID not configured");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
  }

  async append(values: string[][]): Promise<boolean> {
    try {
      console.log("DEBUG: sheets_append() entered");
      console.log("DEBUG: Pending API call to append values");

      const range = "MemberLeads";

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: range,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: values,
        },
      });

      const updatedCells = response.data.updates?.updatedCells || 0;
      console.log(`DEBUG: API call successful; Updated cells: ${updatedCells}`);

      // Check if we updated the expected number of cells (13 columns based on the data structure)
      return updatedCells === 13;
    } catch (error) {
      console.error(
        "ERROR: sheets_append caught exception:",
        (error as Error).message
      );
      console.error((error as Error).stack);

      throw new Error(
        `Unable to append to Google Sheet: ${(error as Error).message}`
      );
    }
  }
}

// Create singleton instance
let sheetsService: GoogleSheetsService | null = null;

function getSheetsService(): GoogleSheetsService {
  if (!sheetsService) {
    sheetsService = new GoogleSheetsService();
  }
  return sheetsService;
}

export async function appendToSheets(data: string[][]): Promise<void> {
  try {
    const service = getSheetsService();
    const success = await service.append(data);

    if (!success) {
      throw new Error("Failed to append all expected cells to Google Sheets");
    }
  } catch (error) {
    console.error("Google Sheets append error:", error);
    throw error;
  }
}
