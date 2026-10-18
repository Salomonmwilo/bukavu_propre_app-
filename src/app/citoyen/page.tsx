import type { Metadata } from "next";
import { RolePlaceholder } from "@/components/RolePlaceholder";

export const metadata: Metadata = {
  title: "Signaler un dépôt",
};

export default function CitoyenPage() {
  return <RolePlaceholder role="citoyen" />;
}
