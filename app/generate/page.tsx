"use client"

import type React from "react"
import { useState } from "react"
import QRCode from "qrcode"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const allergiesList = ["Pollen", "Dust", "Pet Dander", "Peanuts", "Shellfish"]
const medicationsList = ["Aspirin", "Ibuprofen", "Penicillin", "Insulin", "Metformin"]
const medicalConditionsList = ["Asthma", "Diabetes", "Hypertension", "Arthritis", "Migraine"]

const bloodGroupMap: { [key: string]: number } = {
  "A+": 0,
  "A-": 1,
  "B+": 2,
  "B-": 3,
  "O+": 4,
  "O-": 5,
  "AB+": 6,
  "AB-": 7,
}

const substanceUseMap: { [key: string]: number } = {
  None: 0,
  "Alcohol Only": 1,
  "Tobacco Only": 2,
  "Both Alcohol and Tobacco": 3,
}

function binaryToBase62(binaryStr: string): string {
  if (!/^[01]+$/.test(binaryStr)) {
    throw new Error("Input must be a binary string (only 0s and 1s).")
  }

  const base62Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const base62Radix = 62

  const decimalValue = BigInt("0b" + binaryStr)

  let base62Str = ""
  let value = decimalValue

  while (value > 0) {
    const remainder = Number(value % BigInt(base62Radix))
    base62Str = base62Chars[remainder] + base62Str
    value = value / BigInt(base62Radix)
  }

  return base62Str || "0"
}

function decimalToBase62(decimalValue: number): string {
  const base62Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const base62Radix = 62

  let base62Str = ""
  let value = BigInt(decimalValue)

  while (value > 0) {
    const remainder = Number(value % BigInt(base62Radix))
    base62Str = base62Chars[remainder] + base62Str
    value = value / BigInt(base62Radix)
  }

  return base62Str || "0"
}

interface FormData {
  name: string
  dob: string
  height: string
  weight: string
  bloodGroup: string
  emergencyContact: string
  allergies: string[]
  substanceUse: string
  pregnant: boolean
  organDonor: boolean
  medications: string[]
  medicalConditions: string[]
}

const Generate: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    height: "",
    weight: "",
    bloodGroup: "",
    emergencyContact: "",
    allergies: [],
    substanceUse: "",
    pregnant: false,
    organDonor: false,
    medications: [],
    medicalConditions: [],
  })

  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      if (name === "allergies" || name === "medications" || name === "medicalConditions") {
        setFormData((prevData) => {
          const items = new Set(prevData[name as keyof FormData] as string[])
          if (target.checked) items.add(value)
          else items.delete(value)
          return { ...prevData, [name]: Array.from(items) }
        })
      } else {
        setFormData({ ...formData, [name]: target.checked })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const encodeData = (data: FormData): string => {
    const dobEncoded = data.dob.replace(/\D/g, "")
    const heightEncoded = data.height.padStart(3, "0")
    const weightEncoded = data.weight.padStart(3, "0")
    const bloodGroupEncoded = bloodGroupMap[data.bloodGroup].toString()
    const substanceUseEncoded = substanceUseMap[data.substanceUse].toString()
    const numericPart = dobEncoded + heightEncoded + weightEncoded + bloodGroupEncoded + substanceUseEncoded
    const base62NumericPart = decimalToBase62(Number.parseInt(numericPart))
    console.log("Numeric part:", numericPart)
    console.log("Base62 numeric part:", Number.parseInt(numericPart))
    let binaryPart = ""
    binaryPart += data.pregnant ? "1" : "0"
    binaryPart += data.organDonor ? "1" : "0"
    binaryPart += allergiesList.map((allergy) => (data.allergies.includes(allergy) ? "1" : "0")).join("")
    binaryPart += medicationsList.map((medication) => (data.medications.includes(medication) ? "1" : "0")).join("")
    binaryPart += medicalConditionsList
      .map((condition) => (data.medicalConditions.includes(condition) ? "1" : "0"))
      .join("")
    const base62BinaryPart = binaryToBase62(binaryPart)
    return `${base62NumericPart}-${base62BinaryPart}-${data.name}-${decimalToBase62(Number.parseInt(data.emergencyContact))}`
  }

  const encryptData = (data: string, pin: string): string => {
    let encrypted = ""
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ pin.charCodeAt(i % pin.length))
    }
    return btoa(encrypted)
  }

  const handleGenerateQRCode = async () => {
    setLoading(true)
    const encodedData = encodeData(formData)
    console.log("Encoded data:", encodedData)
    console.log("PIN:", pin)
    console.log("DOB", formData.dob)
    console.log("Phone NO", formData.emergencyContact)
    const encryptedData = encryptData(encodedData, pin)
    const qrCodeData = `https://opentag.github.io/q?=${encryptedData}`
    console.log("QR code data:", qrCodeData)

    const qrCodeOptions = {
      margin: 0,
      color: { dark: "#ffffff", light: "#ff3131" },
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData, qrCodeOptions)
      const existingPdfBytes = await fetch("/template.pdf").then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const qrImage = await pdfDoc.embedPng(qrCodeDataUrl)

      firstPage.drawImage(qrImage, { x: 75, y: 190, width: 175, height: 175 })
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      firstPage.drawText(`${pin}`, { x: 175, y: 144, size: 30, color: rgb(1, 1, 1), font: await pdfDoc.embedFont(StandardFonts.HelveticaBold) })
      firstPage.drawText(`${formData.bloodGroup}`, { x: 200, y: 100, size: 40, color: rgb(1, 1, 1), font: await pdfDoc.embedFont(StandardFonts.HelveticaBold) })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const downloadLink = document.createElement("a")
      downloadLink.href = url
      downloadLink.download = `profile.pdf`
      downloadLink.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating QR code:", error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen dark:bg-black flex flex-col items-center justify-center p-6">
      <div className="p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-6 text-center">
          Get <span className="italic text-red-500 dark:text-red-500">Serverless</span> Tag
        </h1>
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Medical Information Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              handleGenerateQRCode()
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  min="1"
                  max="999"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                />
              </div>
                <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  min="1"
                  max="999"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                />
                </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {Object.keys(bloodGroupMap).map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
                <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="tel"
                    placeholder="dont include country code"
                    pattern="[1-9]{1}[0-9]{9}"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="substanceUse">Substance Use</Label>
              <select
                id="substanceUse"
                name="substanceUse"
                value={formData.substanceUse}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Substance Use</option>
                {Object.keys(substanceUseMap).map((use) => (
                  <option key={use} value={use}>
                    {use}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pregnant"
                  name="pregnant"
                  checked={formData.pregnant}
                  onChange={handleInputChange}
                />
                <Label htmlFor="pregnant">Pregnant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="organDonor"
                  name="organDonor"
                  checked={formData.organDonor}
                  onChange={handleInputChange}
                />
                <Label htmlFor="organDonor">Organ Donor</Label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Allergies</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {allergiesList.map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`allergy-${allergy}`}
                      name="allergies"
                      value={allergy}
                      checked={formData.allergies.includes(allergy)}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor={`allergy-${allergy}`}>{allergy}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Medications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {medicationsList.map((medication) => (
                  <div key={medication} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`medication-${medication}`}
                      name="medications"
                      value={medication}
                      checked={formData.medications.includes(medication)}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor={`medication-${medication}`}>{medication}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Medical Conditions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {medicalConditionsList.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`condition-${condition}`}
                      name="medicalConditions"
                      value={condition}
                      checked={formData.medicalConditions.includes(condition)}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin">4-Digit PIN</Label>
              <Input
                id="pin"
                name="pin"
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center pt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Generating Tag..." : "Get Serverless Tag"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Generate