import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { KeyRound, Pencil, User } from "lucide-react";
import { usersApi } from "@/api/users";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";

export function ProfilePage() {
  const { data: user, isLoading } = useQuery({ queryKey: ["me"], queryFn: usersApi.me });

  if (isLoading) return <Spinner label="Loading profile…" />;
  if (!user) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Your account details</p>
      </div>

      <Card className="mx-auto max-w-lg p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <User className="h-7 w-7" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{user.fullName}</p>
            <p className="text-sm text-slate-500">@{user.userName}</p>
          </div>
        </div>

        <dl className="divide-y divide-slate-100 text-sm">
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Email</dt>
            <dd className="text-slate-900">{user.email}</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Mobile</dt>
            <dd className="text-slate-900">{user.mobileNo || "—"}</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-slate-500">Address</dt>
            <dd className="text-right text-slate-900">{user.address || "—"}</dd>
          </div>
        </dl>

        <div className="mt-6 flex gap-3">
          <Link to="/profile/edit" className="flex-1">
            <Button variant="secondary" icon={<Pencil className="h-4 w-4" />} className="w-full">
              Edit details
            </Button>
          </Link>
          <Link to="/profile/change-password" className="flex-1">
            <Button variant="secondary" icon={<KeyRound className="h-4 w-4" />} className="w-full">
              Change password
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
