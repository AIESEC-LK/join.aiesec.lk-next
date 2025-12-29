"use client";

import { useState, FormEvent, useEffect } from "react";

// Declare jQuery type for TypeScript
declare global {
  interface Window {
    jQuery: {
      fn: {
        select2: (options?: {
          minimumResultsForSearch?: number;
          width?: string;
        }) => void;
      };
      (selector: string): {
        select2: (options?: {
          minimumResultsForSearch?: number;
          width?: string;
        }) => void;
      };
    };
  }
}

interface FormData {
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  phone: string;
  university: string;
  faculty: string;
  batch: string;
  why: string;
  preferred_contact: string;
  employment_status: string;
  motivation: string;
  referral: string;
  privacy_agreed: boolean;
}

export default function JoinAiesecForm() {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    phone: "",
    university: "",
    faculty: "",
    batch: "",
    why: "",
    preferred_contact: "",
    employment_status: "",
    motivation: "",
    referral: "",
    privacy_agreed: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize Select2 when component mounts
  useEffect(() => {
    const initSelect2 = () => {
      if (typeof window !== "undefined" && window.jQuery) {
        // Initialize Select2 for all select elements
        window.jQuery(".rs-select2 select").select2({
          minimumResultsForSearch: Infinity, // Disable search
          width: "100%",
        });
      }
    };

    // Wait for jQuery and Select2 to load
    const checkLibraries = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        window.jQuery &&
        typeof window.jQuery.fn.select2 === "function"
      ) {
        initSelect2();
        clearInterval(checkLibraries);
      }
    }, 100);

    return () => clearInterval(checkLibraries);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Form submitted successfully!");
    }, 2000);
  };

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div
          id="overlay"
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            position: "fixed",
            top: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <div className="center">
            <div
              className="loadingio-spinner-dual-ring-lwapedn49g"
              style={{ width: "200px" }}
            >
              <div className="ldio-18ldoi6nwr4">
                <div></div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>
            <div
              style={{ color: "#037ef3", fontSize: "20px", fontWeight: "bold" }}
            >
              Please wait while we process your information.
            </div>
          </div>
        </div>
      )}

      <form
        id="signup_form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="row row-space">
          <div className="col-2">
            <div className="input-group">
              <label className="label">
                First Name<span className="required_field"> *</span>
              </label>
              <input
                className="input--style-4"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-2">
            <div className="input-group">
              <label className="label">
                Last Name<span className="required_field"> *</span>
              </label>
              <input
                className="input--style-4"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <div className="input-group">
            <label className="label">
              Date of Birth<span className="required_field"> *</span>
            </label>
            <input
              className="input--style-4 datepicker"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <div className="input-group">
            <label className="label">
              Email Address<span className="required_field"> *</span>
            </label>
            <input
              className="input--style-4"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <div className="input-group">
            <label className="label">
              Phone Number<span className="required_field"> *</span>
            </label>
            <input
              className="input--style-4"
              type="tel"
              placeholder="07xxxxxxxx"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="label">
            University or Institute<span className="required_field"> *</span>
          </label>
          <div className="rs-select2 js-select-simple select--no-search">
            <select
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose option
              </option>
              <option value="7667">University of Colombo</option>
              <option value="7668">University of Kelaniya</option>
              <option value="7669">University of Moratuwa</option>
              <option value="7671">University of Peradeniya</option>
              <option value="7670">University of Sri Jayewardenepura</option>
              <option value="7672">University of Ruhuna</option>
              <option value="7673">Sri Lanka Institute of Information Technology</option>
              <option value="29287">National School of Business Management</option>
            </select>
            <div className="select-dropdown"></div>
          </div>
        </div>

        <div className="row row-space">
          <div className="col-2">
            <div className="input-group">
              <label className="label">
                Faculty<span className="required_field"> *</span>
              </label>
              <input
                className="input--style-4"
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-2">
            <div className="input-group">
              <label className="label">
                Batch<span className="required_field"> *</span>
              </label>
              <input
                className="input--style-4"
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <div className="input-group">
            <label className="label">
              Why do you want to join AIESEC?
              <span className="required_field"> *</span>
            </label>
            <input
              className="input--style-4"
              name="why"
              value={formData.why}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="label">
            What is the most effective way to contact you?
            <span className="required_field"> *</span>
          </label>
          <div className="rs-select2 js-select-simple select--no-search">
            <select
              name="preferred_contact"
              value={formData.preferred_contact}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose option
              </option>
              <option value="21794">Email</option>
              <option value="21792">WhatsApp</option>
            </select>
            <div className="select-dropdown"></div>
          </div>
        </div>

        <div className="input-group">
          <label className="label">
            Which of the following best fits your current employment status?
            <span className="required_field"> *</span>
          </label>
          <div className="rs-select2 js-select-simple select--no-search">
            <select
              name="employment_status"
              value={formData.employment_status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose option
              </option>
              <option value="21790">Unemployed</option>
              <option value="21789">Employed</option>
              <option value="21791">Self-Employed</option>
            </select>
            <div className="select-dropdown"></div>
          </div>
        </div>

        <div className="input-group">
          <label className="label">
            What is your motivation when joining AIESEC?
            <span className="required_field"> *</span>
          </label>
          <div className="rs-select2 js-select-simple select--no-search">
            <select
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose option
              </option>
              <option value="21977">Connect with the impact of AIESEC</option>
              <option value="21976">Global Networking</option>
              <option value="21975">Leadership Experience</option>
              <option value="21974">Personal Development</option>
            </select>
            <div className="select-dropdown"></div>
          </div>
        </div>

        <div className="input-group">
          <label className="label">
            From where did you hear about AIESEC?
            <span className="required_field"> *</span>
          </label>
          <div className="rs-select2 js-select-simple select--no-search">
            <select
              name="referral"
              value={formData.referral}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose option
              </option>
              <option value="21799">From a friend</option>
              <option value="21809">Event</option>
              <option value="21810">Email</option>
              <option value="21802">Facebook</option>
              <option value="21805">Instagram</option>
              <option value="21806">LinkedIn</option>
              <option value="21807">Other Social Media</option>
              <option value="21813">
                Media (magazine, TV, newspaper or radio)
              </option>
              <option value="21809">Uni Session or Presentation</option>
              <option value="21808">Search Engine</option>
              <option value="21800">Information Booth on Campus</option>
              <option value="21814">Other</option>
            </select>
            <div className="select-dropdown"></div>
          </div>
        </div>

        <div className="input-group">
          <div className="row row-space">
            <div className="input-group">
              <input
                type="checkbox"
                name="privacy_agreed"
                className="checkmark input-icon"
                checked={formData.privacy_agreed}
                onChange={handleInputChange}
                required
              />
              <label
                className="label"
                style={{
                  paddingLeft: "40px",
                  fontSize: "14px",
                  textTransform: "none",
                  lineHeight: "20px",
                  marginBottom: "0",
                }}
              >
                I have read and agree to AIESEC Sri Lanka&apos;s{" "}
                <a
                  href="https://old.aiesec.lk/privacy-policy"
                  target="_blank"
                  style={{ color: "#037ef3" }}
                >
                  Privacy Policy
                </a>{" "}
                and I may be contacted by AIESEC representatives for further
                processing.
              </label>
            </div>
          </div>
        </div>

        <div
          className="g-recaptcha"
          data-sitekey="6Le5cqEqAAAAALCwTX8ShZiGVaWwmGs4XB0MXi3k"
        ></div>
        <div className="p-t-15">
          <button
            className="btn btn--radius-2 btn--gt"
            style={{ background: "#037ef3", marginTop: "20px" }}
            type="submit"
          >
            SEND APPLICATION
          </button>
        </div>
      </form>
    </>
  );
}
