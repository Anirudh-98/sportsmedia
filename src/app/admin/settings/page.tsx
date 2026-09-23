'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  Radio,
  Lock,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ADMIN_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  ROLE_PERMISSION_MATRIX,
  UserRole,
  PermissionResource,
} from '@/lib/permissions';
import { useAuth } from '@/context/AuthContext';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const matrix = ROLE_PERMISSION_MATRIX[selectedRole];

  return (
    <DashboardShell
      role="admin"
      roleTitle="Super Admin"
      roleBadge="Platform Oversight"
      themeColor="#032D59"
      navItems={ADMIN_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <ShieldCheck size={12} />
            Zero-Trust Architecture
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Platform Settings & Role Permission Matrix
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Granular enforcement of Read, Write (Create), Update, and Delete capabilities for all 5 roles across 14 platform resources.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Radio size={14} className="text-emerald-500 animate-pulse" />
          <span>Zero-Trust RBAC Active</span>
        </div>
      </div>

      {/* Role Selector Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 mb-6 flex items-center gap-2 text-xs overflow-x-auto">
        {(['student', 'coach', 'school', 'sponsor', 'admin'] as UserRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setSelectedRole(r)}
            className={`px-4 py-2 rounded-xl font-black uppercase text-[11px] tracking-wider transition-all cursor-pointer ${
              selectedRole === r
                ? 'bg-[#032D59] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {r === 'student' ? 'Trainee Journalist' : r} Matrix
          </button>
        ))}
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden mb-6">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-slate-800">
            {(selectedRole === 'student' ? 'Trainee Journalist' : selectedRole).toUpperCase()} — Resource Access Control Matrix
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Architecture: MySQL + JWT RBAC</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-slate-500 uppercase font-black text-[10px] tracking-wider">
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-3 text-center">Read</th>
                <th className="py-3 px-3 text-center">Write (Create)</th>
                <th className="py-3 px-3 text-center">Update</th>
                <th className="py-3 px-3 text-center">Delete</th>
                <th className="py-3 px-4">Scope & Isolation Rules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {(Object.keys(matrix) as PermissionResource[]).map((resKey) => {
                const item = matrix[resKey];
                const formattedTitle = resKey
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase());

                return (
                  <tr key={resKey} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-black text-slate-800">{formattedTitle}</td>

                    {/* Read */}
                    <td className="py-3 px-3 text-center">
                      {item.read ? (
                        <span className="inline-flex p-1 rounded bg-emerald-100 text-emerald-700">
                          <Check size={12} />
                        </span>
                      ) : (
                        <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                          <X size={12} />
                        </span>
                      )}
                    </td>

                    {/* Write */}
                    <td className="py-3 px-3 text-center">
                      {item.write ? (
                        <span className="inline-flex p-1 rounded bg-emerald-100 text-emerald-700">
                          <Check size={12} />
                        </span>
                      ) : (
                        <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                          <X size={12} />
                        </span>
                      )}
                    </td>

                    {/* Update */}
                    <td className="py-3 px-3 text-center">
                      {item.update ? (
                        <span className="inline-flex p-1 rounded bg-emerald-100 text-emerald-700">
                          <Check size={12} />
                        </span>
                      ) : (
                        <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                          <X size={12} />
                        </span>
                      )}
                    </td>

                    {/* Delete */}
                    <td className="py-3 px-3 text-center">
                      {item.delete ? (
                        <span className="inline-flex p-1 rounded bg-rose-100 text-rose-700">
                          <Check size={12} />
                        </span>
                      ) : (
                        <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                          <X size={12} />
                        </span>
                      )}
                    </td>

                    {/* Scope / Description */}
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {item.description}
                      {item.scope && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                          {item.scope}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
