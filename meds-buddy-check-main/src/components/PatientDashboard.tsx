
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import { Badge } from "@/components/ui/badge";
// import { Check, Calendar as CalendarIcon, Image, User } from "lucide-react";
// import MedicationTracker from "./MedicationTracker";
// import { format, isToday, isBefore, startOfDay } from "date-fns";

// const PatientDashboard = () => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [takenDates, setTakenDates] = useState<Set<string>>(new Set());

//   const today = new Date();
//   const todayStr = format(today, 'yyyy-MM-dd');
//   const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
//   const isTodaySelected = isToday(selectedDate);
//   const isSelectedDateTaken = takenDates.has(selectedDateStr);

//   const handleMarkTaken = (date: string, imageFile?: File) => {
//     setTakenDates(prev => new Set(prev).add(date));
//     console.log('Medication marked as taken for:', date);
//     if (imageFile) {
//       console.log('Proof image uploaded:', imageFile.name);
//     }
//   };

//   const getStreakCount = () => {
//     let streak = 0;
//     let currentDate = new Date(today);
    
//     while (takenDates.has(format(currentDate, 'yyyy-MM-dd')) && streak < 30) {
//       streak++;
//       currentDate.setDate(currentDate.getDate() - 1);
//     }
    
//     return streak;
//   };

//   const getDayClassName = (date: Date) => {
//     const dateStr = format(date, 'yyyy-MM-dd');
//     const isPast = isBefore(date, startOfDay(today));
//     const isCurrentDay = isToday(date);
//     const isTaken = takenDates.has(dateStr);
    
//     let className = "";
    
//     if (isCurrentDay) {
//       className += " bg-blue-100 border-blue-300 ";
//     }
    
//     if (isTaken) {
//       className += " bg-green-100 text-green-800 ";
//     } else if (isPast) {
//       className += " bg-red-50 text-red-600 ";
//     }
    
//     return className;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
//             <User className="w-8 h-8" />
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!</h2>
//             <p className="text-white/90 text-lg">Ready to stay on track with your medication?</p>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//             <div className="text-2xl font-bold">{getStreakCount()}</div>
//             <div className="text-white/80">Day Streak</div>
//           </div>
//           <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//             <div className="text-2xl font-bold">{takenDates.has(todayStr) ? "✓" : "○"}</div>
//             <div className="text-white/80">Today's Status</div>
//           </div>
//           <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//             <div className="text-2xl font-bold">{Math.round((takenDates.size / 30) * 100)}%</div>
//             <div className="text-white/80">Monthly Rate</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Today's Medication */}
//         <div className="lg:col-span-2">
//           <Card className="h-fit">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <CalendarIcon className="w-6 h-6 text-blue-600" />
//                 {isTodaySelected ? "Today's Medication" : `Medication for ${format(selectedDate, 'MMMM d, yyyy')}`}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <MedicationTracker 
//                 date={selectedDateStr}
//                 isTaken={isSelectedDateTaken}
//                 onMarkTaken={handleMarkTaken}
//                 isToday={isTodaySelected}
//               />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Calendar */}
//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">Medication Calendar</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={(date) => date && setSelectedDate(date)}
//                 className="w-full"
//                 modifiersClassNames={{
//                   selected: "bg-blue-600 text-white hover:bg-blue-700",
//                 }}
//                 components={{
//                   DayContent: ({ date }) => {
//                     const dateStr = format(date, 'yyyy-MM-dd');
//                     const isTaken = takenDates.has(dateStr);
//                     const isPast = isBefore(date, startOfDay(today));
//                     const isCurrentDay = isToday(date);
                    
//                     return (
//                       <div className="relative w-full h-full flex items-center justify-center">
//                         <span>{date.getDate()}</span>
//                         {isTaken && (
//                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
//                             <Check className="w-2 h-2 text-white" />
//                           </div>
//                         )}
//                         {!isTaken && isPast && !isCurrentDay && (
//                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full"></div>
//                         )}
//                       </div>
//                     );
//                   }
//                 }}
//               />
              
//               <div className="mt-4 space-y-2 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                   <span>Medication taken</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//                   <span>Missed medication</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                   <span>Today</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Check, Calendar as CalendarIcon, User } from "lucide-react";
import { format, isToday, isBefore, startOfDay } from "date-fns";

type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
};

type TakenMap = {
  [date: string]: number[];
};

const PatientDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [takenMap, setTakenMap] = useState<TakenMap>({});
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", frequency: "" });

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

  const isMedTaken = (medId: number, dateStr: string) =>
    takenMap[dateStr]?.includes(medId);

  const handleMarkTaken = (dateStr: string, medId: number) => {
    setTakenMap((prev) => {
      const prevForDate = prev[dateStr] || [];
      const updatedForDate = [...new Set([...prevForDate, medId])];
      const updated = { ...prev, [dateStr]: updatedForDate };
      localStorage.setItem("takenMap", JSON.stringify(updated));
      return updated;
    });
  };

  const getStreakCount = () => {
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dateStr = format(currentDate, "yyyy-MM-dd");
      const allTaken =
        medications.length > 0 &&
        medications.every((med) => isMedTaken(med.id, dateStr));
      if (!allTaken) break;

      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const fetchMedications = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/medications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const cleaned = data.map((med: any) => ({
          id: med.id ?? Date.now(),
          name: med.name ?? "",
          dosage: med.dosage ?? "",
          frequency: med.frequency ?? "",
        }));
        setMedications(cleaned);
        localStorage.setItem("medications", JSON.stringify(cleaned));
      }
    } catch {
      const stored = localStorage.getItem("medications");
      if (stored) setMedications(JSON.parse(stored));
    }
  };

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: Medication = {
      id: Date.now(),
      name: newMed.name,
      dosage: newMed.dosage,
      frequency: newMed.frequency,
    };

    let fullMed = newEntry;

    try {
      const res = await fetch("http://localhost:3001/api/medications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newEntry),
      });

      const added = await res.json();
      fullMed = { ...newEntry, id: added.id || newEntry.id };
    } catch {
      console.warn("Backend unavailable. Saving locally.");
    }

    setMedications((prev) => {
      const updated = [...prev, fullMed];
      localStorage.setItem("medications", JSON.stringify(updated));
      return updated;
    });

    setNewMed({ name: "", dosage: "", frequency: "" });
  };

  const handleDeleteMedication = async (medId: number) => {
    try {
      await fetch(`http://localhost:3001/api/medications/${medId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error("Failed to delete medication:", err);
    }

    setMedications((prev) => {
      const updated = prev.filter((med) => med.id !== medId);
      localStorage.setItem("medications", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const storedMap = localStorage.getItem("takenMap");
    if (storedMap) setTakenMap(JSON.parse(storedMap));

    const storedMeds = localStorage.getItem("medications");
    if (storedMeds) {
      setMedications(JSON.parse(storedMeds));
    } else {
      fetchMedications();
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}!
            </h2>
            <p className="text-white/90 text-lg">Stay consistent with your meds!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{getStreakCount()}</div>
            <div className="text-white/80">Day Streak</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">
              {medications.every((med) => isMedTaken(med.id, todayStr)) ? "✓" : "○"}
            </div>
            <div className="text-white/80">Today's Status</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{Math.round((Object.keys(takenMap).length / 30) * 100)}%</div>
            <div className="text-white/80">Monthly Rate</div>
          </div>
        </div>
      </div>

      {/* Add Medication */}
      <Card>
        <CardHeader>
          <CardTitle>Add Medication</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMedication} className="space-y-2">
            <input className="border p-2 rounded w-full" placeholder="Name" value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} required />
            <input className="border p-2 rounded w-full" placeholder="Dosage" value={newMed.dosage} onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })} required />
            <input className="border p-2 rounded w-full" placeholder="Frequency" value={newMed.frequency} onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })} required />
            <Button type="submit">Add Medication</Button>
          </form>
        </CardContent>
      </Card>

      {/* Medication Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Track for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {medications.length === 0 ? (
            <p>No medications added yet.</p>
          ) : (
            medications.map((med) => (
              <div key={med.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <strong>{med.name}</strong> — {med.dosage} — {med.frequency}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={isMedTaken(med.id, selectedDateStr)}
                    onClick={() => handleMarkTaken(selectedDateStr, med.id)}
                  >
                    {isMedTaken(med.id, selectedDateStr) ? "Taken" : "Mark Taken"}
                  </Button>
                  <button onClick={() => handleDeleteMedication(med.id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Medication Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => d && setSelectedDate(d)}
            className="w-full"
            components={{
              DayContent: ({ date }) => {
                const dateStr = format(date, "yyyy-MM-dd");
                const isTakenAll = medications.length > 0 &&
                  medications.every((med) => isMedTaken(med.id, dateStr));
                const isPast = isBefore(date, startOfDay(today));
                const isCurrentDay = isToday(date);

                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {isTakenAll && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    )}
                    {!isTakenAll && isPast && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full" />
                    )}
                    {isCurrentDay && (
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                );
              },
            }}
          />

          {/* ✅ Legend */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Medication taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <span>Missed medication</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;


