import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import TrainerDashboard from "@/components/pages/dashboard/TrainerDashboard"
// import DashboardPage from "@/components/pages/dashboard/AdminDashboard"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    // <DashboardPage/>
    <TrainerDashboard/>
  )
}