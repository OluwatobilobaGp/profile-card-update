import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Code2, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  RefreshCw, 
  Sparkles,
  Info,
  Check,
  X
} from 'lucide-react';

// Manual validation implementation using pure JS / Regex
const validateManually = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Full name is required';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
    errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else {
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
    }
  }

  // Confirm Password validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Confirmation password is required';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Lightweight Zod simulation to enable standalone execution without external bundling issues
const createZodLikeSchema = () => {
  return {
    safeParse: (data) => {
      const fieldErrors = {};

      // Zod-like string validation for name
      if (typeof data.name !== 'string' || data.name.trim() === '') {
        fieldErrors.name = 'Name is required';
      } else if (data.name.trim().length < 3) {
        fieldErrors.name = 'String must contain at least 3 character(s)';
      } else if (!/^[a-zA-Z\s'-]+$/.test(data.name.trim())) {
        fieldErrors.name = 'Name format invalid (letters & hyphens only)';
      }

      // Zod-like email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || typeof data.email !== 'string') {
        fieldErrors.email = 'Invalid email address';
      } else if (!emailRegex.test(data.email)) {
        fieldErrors.email = 'Invalid email';
      }

      // Zod-like password validation with custom refinements
      if (!data.password || typeof data.password !== 'string') {
        fieldErrors.password = 'String must contain at least 8 character(s)';
      } else if (data.password.length < 8) {
        fieldErrors.password = 'String must contain at least 8 character(s)';
      } else if (!/[A-Z]/.test(data.password)) {
        fieldErrors.password = 'Must contain at least 1 uppercase letter';
      } else if (!/[0-9]/.test(data.password)) {
        fieldErrors.password = 'Must contain at least 1 number';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
        fieldErrors.password = 'Must contain at least 1 symbol';
      }

      // Zod-like refinement (superRefine / refine) for matching passwords
      if (!data.confirmPassword) {
        fieldErrors.confirmPassword = 'Confirm password is required';
      } else if (data.password !== data.confirmPassword) {
        fieldErrors.confirmPassword = "Passwords don't match";
      }

      const success = Object.keys(fieldErrors).length === 0;
      return {
        success,
        data: success ? data : undefined,
        error: !success ? { formErrors: { fieldErrors } } : undefined
      };
    }
  };
};

const zodSchema = createZodLikeSchema();

const calculatePasswordStrength = (pass) => {
  if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200' };
  let score = 0;
  if (pass.length >= 8) score += 1;
  if (pass.length >= 12) score += 1;
  if (/[A-Z]/.test(pass)) score += 1;
  if (/[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;

  if (score <= 1) return { score: 20, label: 'Weak', color: 'bg-rose-500' };
  if (score <= 3) return { score: 55, label: 'Fair', color: 'bg-amber-500' };
  if (score === 4) return { score: 80, label: 'Good', color: 'bg-blue-500' };
  return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
};

export default function App() {
  const [mode, setMode] = useState('manual'); // 'manual' | 'zod'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derive validation errors based on current mode
  const validationResult = useMemo(() => {
    if (mode === 'manual') {
      const res = validateManually(formData);
      return {
        isValid: res.isValid,
        errors: res.errors
      };
    } else {
      const parsed = zodSchema.safeParse(formData);
      const errors = {};
      if (!parsed.success && parsed.error?.formErrors?.fieldErrors) {
        Object.entries(parsed.error.formErrors.fieldErrors).forEach(([key, val]) => {
          errors[key] = Array.isArray(val) ? val[0] : val;
        });
      }
      return {
        isValid: parsed.success,
        errors
      };
    }
  }, [formData, mode]);

  const strength = useMemo(() => calculatePasswordStrength(formData.password), [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark all touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (validationResult.isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedData({
          ...formData,
          validatedVia: mode.toUpperCase(),
          timestamp: new Date().toLocaleTimeString()
        });
      }, 600);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setTouched({});
    setSubmittedData(null);
  };

  const manualCodeSnippet = `// 1. Manual Validation: Pure JavaScript logic
const validate = (values) => {
  const errors = {};
  if (!values.name?.trim()) {
    errors.name = 'Full name is required';
  } else if (values.name.length < 3) {
    errors.name = 'Must be at least 3 characters';
  }
  
  if (!/\\S+@\\S+\\.\\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if ((values.password?.length || 0) < 8) {
    errors.password = 'At least 8 characters required';
  }
  
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};`;

  const zodCodeSnippet = `// 2. Zod Schema: Declarative type-safe schema
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Must contain at least 8 characters")
    .regex(/[A-Z]/, "Requires an uppercase letter")
    .regex(/[0-9]/, "Requires a number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-4 sm:p-8 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Banner / Header */}
      <div className="w-full max-w-5xl mb-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Validation Architecture Demo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Manual Validation <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300">vs</span> Zod Schema
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Experience the operational contrast between manual procedural condition checking and declarative schema validation with type-safe constraints.
        </p>

        {/* Validation Strategy Mode Selector */}
        <div className="pt-2 flex justify-center">
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl flex items-center gap-2 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                mode === 'manual'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>1. Manual Validation</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('zod')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                mode === 'zod'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>2. Zod Schema Mode</span>
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Card (7 cols on lg) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Active Mode Highlight Tag */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Create Account
              </h2>
              <p className="text-xs text-slate-400">Fill in details to test real-time validation responses</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                mode === 'manual' 
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                  : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${mode === 'manual' ? 'bg-amber-400' : 'bg-indigo-400'} animate-pulse`} />
                {mode === 'manual' ? 'Manual Engine' : 'Zod Engine'}
              </span>
              <button
                onClick={handleReset}
                title="Reset Form"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Field: Full Name */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                {touched.name && !validationResult.errors.name && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Valid
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full bg-slate-950/70 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-4 py-3 border transition-all duration-200 outline-none focus:ring-2 ${
                    touched.name && validationResult.errors.name
                      ? 'border-rose-500/80 focus:ring-rose-500/20 focus:border-rose-500'
                      : touched.name && !validationResult.errors.name
                      ? 'border-emerald-500/60 focus:ring-emerald-500/20 focus:border-emerald-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {touched.name && validationResult.errors.name && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {validationResult.errors.name}
                </p>
              )}
            </div>

            {/* Field: Email */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                {touched.email && !validationResult.errors.email && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Valid
                  </span>
                )}
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="alex@company.com"
                className={`w-full bg-slate-950/70 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-4 py-3 border transition-all duration-200 outline-none focus:ring-2 ${
                  touched.email && validationResult.errors.email
                    ? 'border-rose-500/80 focus:ring-rose-500/20 focus:border-rose-500'
                    : touched.email && !validationResult.errors.email
                    ? 'border-emerald-500/60 focus:ring-emerald-500/20 focus:border-emerald-500'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {touched.email && validationResult.errors.email && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {validationResult.errors.email}
                </p>
              )}
            </div>

            {/* Field: Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password <span className="text-rose-400">*</span>
                </label>
                {formData.password && (
                  <span className="text-[11px] font-medium text-slate-400">
                    Strength: <span className="text-slate-200 font-semibold">{strength.label}</span>
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                  className={`w-full bg-slate-950/70 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-4 pr-11 py-3 border transition-all duration-200 outline-none focus:ring-2 ${
                    touched.password && validationResult.errors.password
                      ? 'border-rose-500/80 focus:ring-rose-500/20 focus:border-rose-500'
                      : touched.password && !validationResult.errors.password
                      ? 'border-emerald-500/60 focus:ring-emerald-500/20 focus:border-emerald-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-lg"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Progress Bar */}
              {formData.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 pt-1">
                    <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-emerald-400' : ''}`}>
                      {formData.password.length >= 8 ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      8+ chars
                    </div>
                    <div className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-emerald-400' : ''}`}>
                      {/[A-Z]/.test(formData.password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Uppercase
                    </div>
                    <div className={`flex items-center gap-1 ${/[0-9]/.test(formData.password) && /[^A-Za-z0-9]/.test(formData.password) ? 'text-emerald-400' : ''}`}>
                      {/[0-9]/.test(formData.password) && /[^A-Za-z0-9]/.test(formData.password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Number & Symbol
                    </div>
                  </div>
                </div>
              )}

              {touched.password && validationResult.errors.password && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {validationResult.errors.password}
                </p>
              )}
            </div>

            {/* Field: Confirm Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                {touched.confirmPassword && !validationResult.errors.confirmPassword && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Matches
                  </span>
                )}
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="Re-type your password"
                className={`w-full bg-slate-950/70 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-4 py-3 border transition-all duration-200 outline-none focus:ring-2 ${
                  touched.confirmPassword && validationResult.errors.confirmPassword
                    ? 'border-rose-500/80 focus:ring-rose-500/20 focus:border-rose-500'
                    : touched.confirmPassword && !validationResult.errors.confirmPassword
                    ? 'border-emerald-500/60 focus:ring-emerald-500/20 focus:border-emerald-500'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {touched.confirmPassword && validationResult.errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {validationResult.errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm transition active:scale-[0.99] disabled:opacity-70"
              >
                <div className={`absolute inset-0 transition duration-300 ${
                  mode === 'manual' 
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600' 
                    : 'bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600'
                }`} />
                <div className="relative px-6 py-3.5 bg-slate-950 rounded-[11px] flex items-center justify-center gap-2 group-hover:bg-opacity-80 transition duration-200">
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Submit Form ({mode === 'manual' ? 'Manual Validation' : 'Zod Validation'})</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>

          {/* Submission Success Box */}
          {submittedData && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-semibold text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Form Successfully Validated and Submitted!
              </div>
              <p className="text-slate-400">Validated via <span className="font-mono text-white font-semibold">{submittedData.validatedVia}</span> at {submittedData.timestamp}</p>
              <div className="p-2.5 bg-slate-950/80 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto border border-slate-800">
                {JSON.stringify({ name: submittedData.name, email: submittedData.email, password: '••••••••' }, null, 2)}
              </div>
            </div>
          )}
        </div>

        {}
        <div className="lg:col-span-5 space-y-6">
          {/* Architecture Comparison Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Logic Comparison & Insights</span>
            </div>

            <div className="text-xs text-slate-300 space-y-3">
              {mode === 'manual' ? (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 leading-relaxed">
                    <strong>Manual Imperative Validation:</strong> Validates fields using customized conditions and conditional regex trees.
                  </div>
                  <ul className="space-y-1.5 text-slate-400 list-disc list-inside text-[12px]">
                    <li><strong className="text-slate-200">Pros:</strong> Zero external dependencies, tiny bundle footprint.</li>
                    <li><strong className="text-slate-200">Cons:</strong> Verbose, repetitive, prone to edge case leaks, no built-in TypeScript type inference.</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-200 leading-relaxed">
                    <strong>Zod Declarative Schema:</strong> Centralizes shape validation, type transformations, and automatic TypeScript static typing via <code className="bg-indigo-950 px-1 py-0.5 rounded text-indigo-300">z.infer&lt;...&gt;</code>.
                  </div>
                  <ul className="space-y-1.5 text-slate-400 list-disc list-inside text-[12px]">
                    <li><strong className="text-slate-200">Pros:</strong> Composable, DRY, reusable across frontend and backend API handlers, built-in refinements.</li>
                    <li><strong className="text-slate-200">Cons:</strong> Adds external library dependency (~12kb gzip).</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Code Viewer */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1.5">
                <span>{mode === 'manual' ? 'manualValidator.js' : 'schema.zod.ts'}</span>
                <span className="text-indigo-400 uppercase text-[10px] font-bold">{mode} implementation</span>
              </div>
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed shadow-inner">
                <code>{mode === 'manual' ? manualCodeSnippet : zodCodeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Real-time State Monitor */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Info className="w-4 h-4 text-sky-400" />
                <span>Live State & Errors</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase font-bold ${
                validationResult.isValid 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {validationResult.isValid ? 'Form Valid' : 'Invalid'}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Current Active Errors:</span>
                {Object.keys(validationResult.errors).length === 0 ? (
                  <span className="text-emerald-400">None (0 issues detected)</span>
                ) : (
                  <ul className="space-y-1">
                    {Object.entries(validationResult.errors).map(([field, err]) => (
                      <li key={field} className="text-rose-400 flex items-start gap-1">
                        <span className="text-slate-400">{field}:</span> {err}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}