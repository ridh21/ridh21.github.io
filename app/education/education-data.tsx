// education/education-data.tsx

export interface EducationEntry {
    institute: string;
    location: string;
    degree: string; // Combines degree and majors title
    cgpa: string;   // Using string to accommodate notes like "(till first semester)"
    duration: string;
  }
  
  export const educationData: EducationEntry[] = [
    {
      institute: "IIIT-Delhi",
      location: "New Delhi",
      degree: "M. Tech. CSE",
      cgpa: "7.75",
      duration: "Aug 2024 - Present",
    },
    {
      institute: "LDRP-ITR",
      location: "Gandhinagar",
      degree: "B.E. IT",
      cgpa: "8.14",
      duration: "Aug 2020 - Jun 2024",
    },
    {
      institute: "Parth School of Competition and Science",
      location: "Vadodara", // Corrected typo based on common city name
      degree: "H.S.C. (GHSEB)",
      cgpa: "64%",
      duration: "Apr 2019 - Apr 2020",
    },
    {
      institute: "Shree S.K. High School",
      location: "Lunawada",
      degree: "S.S.C. (GSEB)",
      cgpa: "92 % (overall)",
      duration: "Apr 2017 - Apr 2018",
    },
  ];