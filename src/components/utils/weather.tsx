"use client"

import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type WeatherProps = {
  temperature: number
  weather: number
  location: string
}

const getWeatherIcon = (weather: number) => {
  const condition = weather
  switch (true) {
    case condition==0:
      return <Sun className="h-12 w-12 text-yellow-500" />
    case condition==61:
      return <CloudRain className="h-12 w-12 text-blue-500" />
      case condition==3:
      return <Cloud className="h-12 w-12 text-gray-500" />
      case condition==66:
      return <CloudSnow className="h-12 w-12 text-blue-200" />
      case condition==45:
      return <CloudFog className="h-12 w-12 text-gray-400" />
      case condition==96:
      return <CloudLightning className="h-12 w-12 text-yellow-600" />
      case condition==82:
      return <CloudDrizzle className="h-12 w-12 text-blue-400" />
    default:
      return <Cloud className="h-12 w-12 text-gray-500" />
  }
}

export function Weather({ temperature, weather, location }: WeatherProps) {
  return (
    <Card className="w-full max-w-md transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{location}</CardTitle>
        <div className="rounded-full bg-primary/10 p-2 dark:bg-primary/20">{getWeatherIcon(weather)}</div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold tracking-tight">
              {temperature}
            </p>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Condition</p>
              <p className="font-medium">{weather}</p>
            </div>
          </div>
          <div className="flex items-center rounded-lg bg-secondary/50 p-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Feels warmer than usual</span>
              <span className="text-xs text-muted-foreground">Consider staying hydrated and in shade</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}