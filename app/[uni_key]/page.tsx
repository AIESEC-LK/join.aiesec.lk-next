import JoinAiesecForm from "../components/JoinAiesecForm";

const UniversityPage = async ({ params }: { params: Promise<{ uni_key: string }> }) => {
  const resolvedParams = await params;
  return <JoinAiesecForm uni_key={resolvedParams.uni_key} />;
};

export default UniversityPage;
