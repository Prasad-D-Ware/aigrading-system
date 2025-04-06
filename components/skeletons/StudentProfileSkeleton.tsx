import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const StudentProfileSkeleton = () => {
  return (
    <div className="space-y-6 md:p-5">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" /> {/* Back button */}
              <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" /> {/* Avatar */}
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" /> {/* Username */}
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /> {/* Profile link */}
              </div>
            </div>
            <div className="mt-5 sm:mt-0">
              <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" /> {/* Grade/Download button */}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center p-3 rounded-lg bg-gray-100">
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse mb-2" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Weekly Activity Chart */}
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-[200px] bg-gray-100 rounded animate-pulse" />
          </div>

          {/* Languages Section */}
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Commit History */}
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-1/4 bg-gray-200 rounded mb-2" />
                    <div className="flex gap-4">
                      <div className="h-3 w-12 bg-gray-200 rounded" />
                      <div className="h-3 w-12 bg-gray-200 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentProfileSkeleton
