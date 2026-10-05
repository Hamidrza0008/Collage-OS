"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

const DEFAULT_STUDENT = {
  id: "std_22cs087",
  name: "Hamid Rza",
  email: "hamid@college.edu",
  enrollmentNo: "22CS087",
  rollNumber: "22CS087",
  phone: "+91 98765 43210",
  role: "student",
  department: "Computer Science & Engineering",
  semester: "7th Semester",
  section: "A",
  academicStatus: "Active",
  accountStatus: "ACTIVE",
  isActivated: true,
  avatar: "/assets/layout/profile-avatar.jpg",
  bio: "Student | Developer | Always learning",
  skills: ["React", "Next.js", "JavaScript", "MongoDB"],
};

const DEFAULT_FACULTY = {
  id: "fac_cse_042",
  name: "Dr. Rajesh Sharma",
  email: "r.sharma@college.edu",
  employeeId: "EMP-1042",
  role: "faculty",
  department: "Computer Science & Engineering",
  designation: "Associate Professor",
  assignedClasses: ["CSE-7A", "CSE-5B"],
  assignedSubjects: ["Distributed Systems", "Database Management"],
  academicStatus: "Active",
  accountStatus: "ACTIVE",
  isActivated: true,
};

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Flow-state for Student Account Activation:
  // Step 1: Verify Identity -> Step 2: Confirm Details -> Step 3: Set Password
  const [activationState, setActivationState] = useState({
    step1Completed: false,
    step2Completed: false,
    enrollmentNo: "",
    email: "",
    name: "Hamid Rza",
    department: "Computer Science & Engineering",
    semester: "7th Semester",
    section: "A",
    rollNumber: "22CS087",
    phone: "+91 98765 43210",
    academicStatus: "Active",
    bio: "Student | Developer | Always learning",
    skills: ["React", "Next.js", "JavaScript", "MongoDB"],
  });

  // Rehydrate auth state on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("college_os_auth_user");
      const hasCookie = typeof document !== "undefined" && document.cookie.includes("college_os_session=true");

      if (storedUser && hasCookie) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } else if (hasCookie && !storedUser) {
        // Fallback demo student if cookie exists but localStorage was cleared
        setUser(DEFAULT_STUDENT);
        setIsAuthenticated(true);
        localStorage.setItem("college_os_auth_user", JSON.stringify(DEFAULT_STUDENT));
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      // Rehydrate activation state from sessionStorage if user refreshed during flow
      const storedActivation = sessionStorage.getItem("college_os_activation_state");
      if (storedActivation) {
        setActivationState(JSON.parse(storedActivation));
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper to set cookie
  const setAuthCookie = (val = "true") => {
    if (typeof document !== "undefined") {
      document.cookie = `college_os_session=${val}; path=/; max-age=86400; SameSite=Lax`;
    }
  };

  // Helper to remove cookie
  const clearAuthCookie = () => {
    if (typeof document !== "undefined") {
      document.cookie = "college_os_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }
  };

  // 1. Student / Staff Login
  const login = async ({ identifier, password, role = "student" }) => {
    setIsLoading(true);
    // Simulate brief network verification delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    let authUser;
    if (role === "student") {
      authUser = {
        ...DEFAULT_STUDENT,
        enrollmentNo: identifier?.toUpperCase() || DEFAULT_STUDENT.enrollmentNo,
        email: identifier?.includes("@") ? identifier.toLowerCase() : DEFAULT_STUDENT.email,
      };
    } else {
      authUser = {
        ...DEFAULT_FACULTY,
        employeeId: identifier || DEFAULT_FACULTY.employeeId,
      };
    }

    setUser(authUser);
    setIsAuthenticated(true);
    setAuthCookie("true");
    localStorage.setItem("college_os_auth_user", JSON.stringify(authUser));
    setIsLoading(false);

    if (authUser.role === "student") {
      router.push("/student");
    } else {
      router.push("/faculty");
    }

    return { success: true, user: authUser };
  };

  // 2. Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearAuthCookie();
    localStorage.removeItem("college_os_auth_user");
    router.push("/auth/student");
  };

  // 3. Activation Flow: Step 1 -> Verify Identity
  const verifyIdentity = async ({ enrollmentNo, email }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const updatedState = {
      ...activationState,
      step1Completed: true,
      step2Completed: false,
      enrollmentNo: enrollmentNo.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      rollNumber: enrollmentNo.trim().toUpperCase(),
    };

    setActivationState(updatedState);
    sessionStorage.setItem("college_os_activation_state", JSON.stringify(updatedState));
    setIsLoading(false);
    return { success: true };
  };

  // 4. Activation Flow: Step 2 -> Confirm Institutional Details
  const confirmDetails = async ({ bio, skills } = {}) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedState = {
      ...activationState,
      step2Completed: true,
      bio: bio !== undefined ? bio : activationState.bio,
      skills: skills !== undefined ? skills : activationState.skills,
    };

    setActivationState(updatedState);
    sessionStorage.setItem("college_os_activation_state", JSON.stringify(updatedState));
    setIsLoading(false);
    return { success: true };
  };

  // 5. Activation Flow: Step 3 -> Create & Set Password
  const setPasswordAndActivate = async (password) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newStudentUser = {
      ...DEFAULT_STUDENT,
      enrollmentNo: activationState.enrollmentNo || "22CS087",
      email: activationState.email || "hamid@college.edu",
      name: activationState.name || "Hamid Rza",
      department: activationState.department,
      semester: activationState.semester,
      section: activationState.section,
      rollNumber: activationState.rollNumber || "22CS087",
      phone: activationState.phone,
      bio: activationState.bio,
      skills: activationState.skills,
      isActivated: true,
      accountStatus: "ACTIVE",
    };

    // Transition account to ACTIVE and establish authenticated session
    setUser(newStudentUser);
    setIsAuthenticated(true);
    setAuthCookie("true");
    localStorage.setItem("college_os_auth_user", JSON.stringify(newStudentUser));
    sessionStorage.removeItem("college_os_activation_state");
    setIsLoading(false);

    router.push("/student");
    return { success: true, user: newStudentUser };
  };

  // Reset activation flow
  const resetActivation = () => {
    setActivationState({
      step1Completed: false,
      step2Completed: false,
      enrollmentNo: "",
      email: "",
      name: "Hamid Rza",
      department: "Computer Science & Engineering",
      semester: "7th Semester",
      section: "A",
      rollNumber: "22CS087",
      phone: "+91 98765 43210",
      academicStatus: "Active",
      bio: "Student | Developer | Always learning",
      skills: ["React", "Next.js", "JavaScript", "MongoDB"],
    });
    sessionStorage.removeItem("college_os_activation_state");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        activationState,
        verifyIdentity,
        confirmDetails,
        setPasswordAndActivate,
        resetActivation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
