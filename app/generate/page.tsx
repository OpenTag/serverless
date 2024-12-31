'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const allergiesList = ['Pollen', 'Dust', 'Pet Dander', 'Peanuts', 'Shellfish']
const medicationsList = ['Aspirin', 'Ibuprofen', 'Penicillin', 'Insulin', 'Metformin']
const medicalConditionsList = ['Asthma', 'Diabetes', 'Hypertension', 'Arthritis', 'Migraine']

const Generate = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    height: '',
    weight: '',
    bloodGroup: '',
    emergencyContact: '',
    allergies: [],
    substanceUse: '',
    pregnant: false,
    organDonor: false,
    medications: [],
    medicalConditions: [],
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && (name === 'allergies' || name === 'medications' || name === 'medicalConditions')) {
      setFormData((prevData) => {
        const items = new Set(prevData[name]);
        if (checked) items.add(value);
        else items.delete(value);
        return { ...prevData, [name]: Array.from(items) };
      });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenerateQRCode = async () => {
    setLoading(true);
    const {
      name,
      dob,
      height,
      weight,
      bloodGroup,
      emergencyContact,
      allergies,
      substanceUse,
      pregnant,
      organDonor,
    } = formData;

    const queryString = new URLSearchParams({
      name,
      dob,
      height,
      weight,
      bloodGroup,
      emergencyContact,
      allergies: allergies.join(','),
      substanceUse,
      pregnant: pregnant.toString(),
      organDonor: organDonor.toString(),
    }).toString();

    const link = `https://opentag.github.io/profile?${queryString}`;
    const qrCodeOptions = {
      margin: 0,
      color: { dark: '#000000', light: '#ffffff' },
    };

    const qrCodeDataUrl = await QRCode.toDataURL(link, qrCodeOptions);
    const existingPdfBytes = await fetch('/template.pdf').then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const qrImage = await pdfDoc.embedPng(qrCodeDataUrl);

    firstPage.drawImage(qrImage, { x: 40, y: 100, width: 100, height: 100 });
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    firstPage.drawText(`Name: ${name}`, { x: 150, y: 400, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`DOB: ${dob}`, { x: 150, y: 380, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Height: ${height}`, { x: 150, y: 360, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Weight: ${weight}`, { x: 150, y: 340, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Blood Group: ${bloodGroup}`, { x: 150, y: 320, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Emergency Contact: ${emergencyContact}`, { x: 150, y: 300, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Substance Use: ${substanceUse}`, { x: 150, y: 280, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Pregnant: ${pregnant ? 'Yes' : 'No'}`, { x: 150, y: 240, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Organ Donor: ${organDonor ? 'Yes' : 'No'}`, { x: 150, y: 220, size: 12, font, color: rgb(0, 0, 0) });
    firstPage.drawText(`Allergies: ${allergies.join(', ')}`, {
      x: 150,
      y: 200,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `profile.pdf`;
    downloadLink.click();
    URL.revokeObjectURL(url);

    setLoading(false);
  };

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
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleGenerateQRCode(); }}>
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
                  <Input id="height" name="height" type="number" value={formData.height} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} required />
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
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required />
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
                  <option value="None">None</option>
                  <option value="Alcohol Only">Alcohol Only</option>
                  <option value="Tobacco Only">Tobacco Only</option>
                  <option value="Both Alcohol and Tobacco">Both Alcohol and Tobacco</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pregnant" name="pregnant" checked={formData.pregnant} onChange={handleInputChange} />
                  <Label htmlFor="pregnant">Pregnant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="organDonor" name="organDonor" checked={formData.organDonor} onChange={handleInputChange} />
                  <Label htmlFor="organDonor">Organ Donor</Label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Allergies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {allergiesList.map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
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
                      <Checkbox
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
                      <Checkbox
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
              <div className="flex justify-center pt-6">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Generating Tag...' : 'Get Serverless Tag'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
};

export default Generate;