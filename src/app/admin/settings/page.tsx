"use client"
import AdminPin from "@/components/admin/settings/adminPin";
import EmployeePin from "@/components/admin/settings/employeePin";
import GuestPin from "@/components/admin/settings/guestPin";
import LeadText from "@/components/leadText";

export default function Page() {

    return (
        <div className="mt-6 flex flex-col gap-2">
            <LeadText>Ustawienia</LeadText>
            <div className="bg-[#f7ba604b] p-2 text-xl rounded-lg">
                <p>Zarządzanie hasłami</p>
                <div className="flex flex-col gap-2">
                    <GuestPin />
                    <AdminPin />
                    <EmployeePin />
                </div>
            </div>
        </div>

    )
}