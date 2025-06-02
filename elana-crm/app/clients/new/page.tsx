// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { clientSchema } from "@/app/validationSchemas";
// import { z } from "zod";
// import { Button, Flex, Select, TextArea } from "@radix-ui/themes";

// type ClientFormData = z.infer<typeof clientSchema>;

// export default function NewClientPage() {
//   const router = useRouter();
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<ClientFormData>({
//     name: "",
//     counterpart_name: "",
//     counterpart_id: "",
//     risk_profile: "no",
//     status: "ACTIVE",
//     type: "individual",
//     phone: "",
//     country: "Bulgaria",
//     address: "",
//     email: "",
//     ic_city: "Varna",
//     language: "Bulgarian",
//     representative: "Dimitar",
//     pro_retail: "retail",
//     comment: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch("/api/clients", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           Array.isArray(errorData)
//             ? errorData[0].message
//             : "Failed to create client"
//         );
//       }

//       router.push("/clients");
//       router.refresh();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Add New Client</h1>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Counterpart Name</label>
//             <input
//               type="text"
//               name="counterpart_name"
//               value={formData.counterpart_name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Counterpart ID</label>
//             <input
//               type="text"
//               name="counterpart_id"
//               value={formData.counterpart_id}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <Flex gap="6" align="center">
//           <div className="space-y-2">
//             <label className="text-sm font-medium">Client Type</label>
//             <Select.Root
//               value={formData.type}
//               onValueChange={(value) => handleSelectChange("type", value)}
//             >
//               <Select.Trigger />
//               <Select.Content>
//                 <Select.Item value="individual">Individual</Select.Item>
//                 <Select.Item value="business">Business</Select.Item>
//               </Select.Content>
//             </Select.Root>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Status</label>
//             <Select.Root
//               value={formData.status}
//               onValueChange={(value) => handleSelectChange("status", value)}
//             >
//               <Select.Trigger />
//               <Select.Content>
//                 <Select.Item value="ACTIVE">Active</Select.Item>
//                 <Select.Item value="INACTIVE">Inactive</Select.Item>
//               </Select.Content>
//             </Select.Root>
//           </div>
//         </Flex>

//         <div className="space-y-4">
//           <label className="text-sm font-medium">Comment</label>
//           <TextArea
//             name="comment"
//             value={formData.comment}
//             onChange={handleChange}
//             rows={3}
//           />
//         </div>

//         <Flex justify="end" gap="4">
//           <Button variant="soft" onClick={() => router.back()}>
//             Cancel
//           </Button>
//           <Button disabled={loading}>
//             {loading ? "Creating..." : "Create Client"}
//           </Button>
//         </Flex>
//       </form>
//     </div>
//   );
// }

"use client";

import { SiteHeader } from "@/components/site-header";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientSchema } from "@/app/validationSchemas";
import { z } from "zod";
import {
  Button,
  Flex,
  Select,
  TextArea,
  Text,
  Separator,
} from "@radix-ui/themes";

const breadcrumbItems = [
  { label: "Customers", href: "/clients" },
  { label: "New Customer" },
];

type ClientFormData = z.infer<typeof clientSchema>;

export default function NewClientPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    counterpart_name: "",
    counterpart_id: "",
    risk_profile: "no",
    status: "ACTIVE",
    type: "individual",
    phone: "",
    country: "Bulgaria",
    address: "",
    email: "",
    ic_city: "Varna",
    language: "Bulgarian",
    representative: "Dimitar",
    pro_retail: "retail",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          Array.isArray(errorData)
            ? errorData[0].message
            : "Failed to create client"
        );
      }

      router.push("/clients");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SiteHeader breadcrumbItems={breadcrumbItems}>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Name", name: "name", type: "text" },
              {
                label: "Counterpart Name",
                name: "counterpart_name",
                type: "text",
              },
              { label: "Counterpart ID", name: "counterpart_id", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Address", name: "address", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="space-y-1">
                <Text as="label" size="2" className="font-medium block">
                  {label}
                </Text>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof ClientFormData] as string}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
          </div>

          <Separator orientation="horizontal" className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Text size="2" className="font-medium block">
                Client Type
              </Text>
              <Select.Root
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <Select.Trigger className="w-full" />
                <Select.Content>
                  <Select.Item value="individual">Individual</Select.Item>
                  <Select.Item value="business">Business</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            <div className="space-y-2">
              <Text size="2" className="font-medium block">
                Status
              </Text>
              <Select.Root
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <Select.Trigger className="w-full" />
                <Select.Content>
                  <Select.Item value="ACTIVE">Active</Select.Item>
                  <Select.Item value="INACTIVE">Inactive</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          <div className="space-y-2">
            <Text size="2" className="font-medium block">
              Comment
            </Text>
            <TextArea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={4}
              className="w-full"
            />
          </div>

          <Flex justify="end" gap="4">
            <Button variant="soft" onClick={() => router.back()} type="button">
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? "Creating..." : "Create Client"}
            </Button>
          </Flex>
        </form>
      </div>
    </SiteHeader>
  );
}
