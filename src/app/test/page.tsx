"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import {
  Home,
  GraduationCap,
  Car,
  Zap,
  Droplet,
  Wifi,
  Banknote,
  PiggyBank,
  Send,
  ListChecks,
  MessageSquare,
  Trophy,
  Users,
  Settings,
  Search,
  Bell,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    title: "Shopping Debit & Credit Card",
    value: "$597",
    icon: <Banknote size={32} />,
  },
  {
    title: "Transfer Other Country",
    value: "$875",
    icon: <Send size={32} />,
  },
  {
    title: "Investment & Insurance",
    value: "$1380",
    icon: <PiggyBank size={32} />,
  },
  {
    title: "Kids Education & Hobbies",
    value: "$1200",
    icon: <GraduationCap size={32} />,
  },
];

const transactionHistory = [
  {
    name: "James Smith",
    description: "Graphic Design",
    date: "29/06/22",
    amount: "$259.50",
    status: "Completed",
  },
  {
    name: "Robert William",
    description: "Photo Editing",
    date: "25/06/22",
    amount: "$490.00",
    status: "Reviewed",
  },
  {
    name: "Linda Brown",
    description: "Financial Planner",
    date: "21/06/22",
    amount: "$374.00",
    status: "Completed",
  },
  {
    name: "Michael Brown",
    description: "Architect Services",
    date: "17/06/22",
    amount: "$842.00",
    status: "Completed",
  },
];

const scheduledPayments = [
  {
    title: "Home Cleaning",
    description: "12 Hrs - Pending",
    amount: "$497",
    icon: <Home size={20} />,
  },
  {
    title: "Kids Education",
    description: "2 Days - Pending",
    amount: "$136",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "Car Insurance",
    description: "3 Days - Pending",
    amount: "$258",
    icon: <Car size={20} />,
  },
];

const recentPayments = [
  {
    title: "Electric Bill",
    description: "30/07/22 - Completed",
    amount: "$221",
    icon: <Zap size={20} />,
  },
  {
    title: "Water Bill",
    description: "27/07/22 - Completed",
    amount: "$189",
    icon: <Droplet size={20} />,
  },
  {
    title: "Home Internet Bill",
    description: "19/07/22 - Completed",
    amount: "$75",
    icon: <Wifi size={20} />,
  },
];
interface sidebarProps{
  icon:React.ReactNode;
  label:string
;}

const SidebarButton = ({ icon, label }:sidebarProps) => {
    return(
        <li>
        <Button variant="ghost" className="justify-start w-full text-white">
          {icon}
          {label}
        </Button>
      </li>
    )

}
    


const BalanceChart = () => {
  const chartData = [
    { month: "Jan", balance: 2400 },
    { month: "Feb", balance: 1398 },
    { month: "Mar", balance: 9800 },
    { month: "Apr", balance: 3908 },
    { month: "May", balance: 4800 },
    { month: "Jun", balance: 3800 },
    { month: "Jul", balance: 4300 },
    { month: "Aug", balance: 2400 },
    { month: "Sep", balance: 1398 },
    { month: "Oct", balance: 9800 },
    { month: "Nov", balance: 3908 },
    { month: "Dec", balance: 4800 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="balance" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

function Dashboard() {
  const sidebarItems = [
    { icon: <Home className="mr-2 h-4 w-4" />, label: "Dashboard" },
    { icon: <ListChecks className="mr-2 h-4 w-4" />, label: "Transactions" },
    { icon: <MessageSquare className="mr-2 h-4 w-4" />, label: "Invoices" },
    { icon: <Users className="mr-2 h-4 w-4" />, label: "Customers" },
    { icon: <Trophy className="mr-2 h-4 w-4" />, label: "Rewards" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-violet-600 text-white p-4 flex flex-col">
        <div className="font-bold text-lg mb-8">Finance</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <SidebarButton key={index} icon={item.icon} label={item.label} />
            ))}
          </ul>
        </nav>
        <Button variant="ghost" className="justify-start w-full text-white">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">Hi James, Good Morning!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                className="pr-10 rounded-full"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <Button variant="outline" size="icon">
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <span className="font-semibold">James Smith</span>
          </div>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {data.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{item.value}</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.title}</span>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Transaction History */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Last 3 Months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactionHistory.map((transaction, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarFallback>
                                  {transaction.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              {transaction.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Badge>{transaction.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Balance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Balance</CardTitle>
                <CardDescription>Last 12 Months</CardDescription>
              </CardHeader>
              <CardContent>
                <BalanceChart />
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div>
            {/* Credit Card */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Credit</CardTitle>
                <CardDescription>
                  Available Funds: $75,389.25
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-violet-600 text-white rounded-md p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>**** **** **** 1234</span>
                    <CreditCard size={20} />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expires 01/23</span>
                    <span>CVV 123</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduled Payments */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Schedule Payments</CardTitle>
                <CardDescription>August 2022</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scheduledPayments.map((payment, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        {payment.icon}
                        <div>
                          <p className="text-sm font-medium">{payment.title}</p>
                          <p className="text-xs text-gray-500">
                            {payment.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm">{payment.amount}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Last 30 Days</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentPayments.map((payment, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        {payment.icon}
                        <div>
                          <p className="text-sm font-medium">{payment.title}</p>
                          <p className="text-xs text-gray-500">
                            {payment.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm">{payment.amount}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;