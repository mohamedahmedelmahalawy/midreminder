import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EmailInputOrigin() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}><span className="text-destructive"></span>
      </Label>
      <Input id={id} placeholder="Email" type="email" required />
    </div>
  )
}
