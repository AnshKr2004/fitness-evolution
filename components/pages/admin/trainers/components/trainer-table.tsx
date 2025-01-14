"use client"

import { Edit2, Trash } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'

interface Trainer {
  id: string
  name: string
  email: string
  specialization: string
  rating: number
  clients: number
  status: "Active" | "Inactive"
}

const trainers: Trainer[] = [
  {
    id: "1",
    name: "Mike Johnson",
    email: "mike.j@fitness.com",
    specialization: "Strength Training",
    rating: 4.9,
    clients: 45,
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.w@fitness.com",
    specialization: "Yoga, Pilates",
    rating: 4.7,
    clients: 38,
    status: "Active",
  },
]

export function TrainerTable() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Trainer Management</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            placeholder="Search trainers..."
            className="max-w-xs"
          />
          <Button className='bg-blue-600 dark:bg-blue-700'>Add Trainer</Button>
        </div>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trainer</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Clients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainers.map((trainer) => (
              <TableRow key={trainer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image src="/pfp.jpg" alt='profile' width={40} height={40} className="rounded-full bg-gray-100"/>
                    <div>
                      <div className="font-medium">{trainer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {trainer.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{trainer.specialization}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {trainer.rating}
                  </div>
                </TableCell>
                <TableCell>{trainer.clients}</TableCell>
                <TableCell>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    trainer.status === "Active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {trainer.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Showing 1 to 2 of 42 results
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            1
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            2
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            3
          </Button>
        </div>
      </div>
    </div>
  )
}