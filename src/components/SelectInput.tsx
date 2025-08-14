import { useId } from "react"

import { Label } from "@/components/ui/label"
import { SelectNative } from "@/components/ui/select-native"

export default function SelectInput() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Doctor Profession</Label>
      <SelectNative id={id}>
        <option value="1">General Practitioner</option>
        <option value="2">Physician</option>
        <option value="3">Surgeon</option>
        <option value="4">Dentist</option>
        <option value="5">Pediatrician</option>
      </SelectNative>
    </div>
  )
}
