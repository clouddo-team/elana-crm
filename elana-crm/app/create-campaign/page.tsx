"use client";

export default function CreateCampaignPage() {
  const handleCreateCampaign = async () => {
    const res = await fetch("/api/mailerlite/campaigns/create-campaign", {
      method: "POST",
    });
    const data = await res.json();
    console.log("Campaign result:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h1>Create Campaign</h1>
      <button onClick={handleCreateCampaign}>Create Campaign</button>
    </div>
  );
}
