
import { redirect } from "next/navigation";

export default function CustomRequestPage() {
    redirect("/project-request?plan=EPIC");
}
