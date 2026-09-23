'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Lock,
  User,
  GraduationCap,
  Building2,
  Handshake,
  UserPlus,
  Trash2,
  Edit3,
  RefreshCw,
  X,
  Plus,
  Shield,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ADMIN_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { useAuth, UserRole } from '@/context/AuthContext';
import {
  subscribeUsers,
  createUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  AppUser,
} from '@/services/realtimeData';

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [newRoleSelection, setNewRoleSelection] = useState<UserRole>('student');

  // Form states for adding user
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');
  const [newUserInstitution, setNewUserInstitution] = useState('');
  const [newUserStatus, setNewUserStatus] = useState<'Active' | 'Verified' | 'Pending' | 'Suspended'>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeUsers((liveUsers) => {
      setUsers(liveUsers);
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showToast('Please fill out user name and email.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createUser({
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        role: newUserRole,
        institution: newUserInstitution.trim() || 'Individual',
        status: newUserStatus,
      });

      showToast(`User ${newUserName} added successfully.`);
      setIsAddUserModalOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserInstitution('');
      setNewUserRole('student');
      setNewUserStatus('Active');
    } catch (err: any) {
      showToast('Failed to create user: ' + (err.message || 'Error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveRoleChange = async () => {
    if (!selectedUser) return;
    try {
      await updateUserRole(selectedUser.id, newRoleSelection);
      showToast(`Role updated to ${newRoleSelection.toUpperCase()} for ${selectedUser.name}.`);
      setIsEditRoleModalOpen(false);
      setSelectedUser(null);
    } catch (err: any) {
      showToast('Failed to update role');
    }
  };

  const handleStatusToggle = async (targetUser: AppUser, nextStatus: 'Active' | 'Verified' | 'Pending' | 'Suspended') => {
    try {
      await updateUserStatus(targetUser.id, nextStatus);
      showToast(`Status updated to ${nextStatus} for ${targetUser.name}.`);
    } catch (err) {
      showToast('Failed to update status');
    }
  };

  const handleDelete = async (targetUser: AppUser) => {
    if (confirm(`Are you sure you want to permanently delete ${targetUser.name} (${targetUser.email}) from Database?`)) {
      try {
        await deleteUser(targetUser.id);
        showToast(`User ${targetUser.name} removed from Database.`);
      } catch (err) {
        showToast('Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole =
      roleFilter === 'All' ||
      (roleFilter === 'Trainee Journalist' ? u.role === 'student' : u.role === roleFilter.toLowerCase());
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.institution && u.institution.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  // KPI Calculations
  const totalCount = users.length;
  const studentCount = users.filter((u) => u.role === 'student').length;
  const coachCount = users.filter((u) => u.role === 'coach').length;
  const schoolCount = users.filter((u) => u.role === 'school').length;
  const sponsorCount = users.filter((u) => u.role === 'sponsor').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-2 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Database Realtime Sync Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            User Accounts & Roles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Live directory of authenticated users in Hostinger Cloud Database with strict zero-trust role segregation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddUserModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#032D59] hover:bg-[#0B5FA5] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <UserPlus size={15} />
          <span>Add New Account</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Users</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
          <div className="text-[10px] font-bold text-emerald-600 mt-0.5">Live Database</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
          <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">Journalists</div>
          <div className="text-2xl font-black text-blue-900 mt-1">{studentCount}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5">Student role</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
          <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Coaches</div>
          <div className="text-2xl font-black text-emerald-900 mt-1">{coachCount}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5">Coach role</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-purple-100 shadow-2xs">
          <div className="text-[10px] font-black uppercase tracking-wider text-purple-600">Schools</div>
          <div className="text-2xl font-black text-purple-900 mt-1">{schoolCount}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5">School role</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs">
          <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">Sponsors</div>
          <div className="text-2xl font-black text-amber-900 mt-1">{sponsorCount}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5">Sponsor role</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-2xs">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-600">Admins</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{adminCount}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5">Super Admin</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or institution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-[#0B5FA5] bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {['All', 'Trainee Journalist', 'Coach', 'School', 'Sponsor', 'Admin'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg font-black text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                roleFilter === r
                  ? 'bg-[#032D59] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-black text-[10px] tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Institution / Affiliation</th>
                <th className="py-3 px-3">Joined Date</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    No users found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-black text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-slate-900 text-white'
                            : u.role === 'student'
                            ? 'bg-blue-100 text-blue-800'
                            : u.role === 'coach'
                            ? 'bg-emerald-100 text-emerald-800'
                            : u.role === 'school'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {u.role === 'student' ? 'Trainee Journalist' : u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium">{u.institution || 'Individual'}</td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{u.joinedDate || 'Recent'}</td>
                    <td className="py-3 px-3 text-center">
                      <select
                        value={u.status || 'Active'}
                        onChange={(e) => handleStatusToggle(u, e.target.value as any)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border cursor-pointer ${
                          u.status === 'Suspended'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : u.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUser(u);
                            setNewRoleSelection(u.role);
                            setIsEditRoleModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-black uppercase transition-colors inline-flex items-center gap-1 cursor-pointer"
                          title="Edit User Role"
                        >
                          <Edit3 size={11} />
                          <span>Role</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(u)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          MODAL: ADD USER DIRECTLY TO DATABASE
         ========================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#032D59] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UserPlus size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Add New User Account</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar / Oakridge Sports Department"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@sportsmedia.world"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Role Category *
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="student">Trainee Journalist</option>
                    <option value="coach">Coach</option>
                    <option value="school">School</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newUserStatus}
                    onChange={(e) => setNewUserStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Institution / School / Organization (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. DPS Hyderabad / Hyderabad Sports Club"
                  value={newUserInstitution}
                  onChange={(e) => setNewUserInstitution(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-[#032D59] hover:bg-[#0B5FA5] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Plus size={14} />
                  <span>{isSubmitting ? 'Saving to Database...' : 'Create User Account'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: EDIT ROLE IN DATABASE
         ========================================== */}
      {isEditRoleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#032D59] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <h3 className="text-sm font-black uppercase tracking-wide">Adjust Role Privileges</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditRoleModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="font-black text-slate-900">{selectedUser.name}</div>
                <div className="text-slate-500 font-mono text-[11px]">{selectedUser.email}</div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Current Role:{' '}
                  <span className="font-black text-[#0B5FA5] uppercase">
                    {selectedUser.role === 'student' ? 'Trainee Journalist' : selectedUser.role}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-2">
                  Select New Authorized Role
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'student', title: 'Trainee Journalist' },
                    { id: 'coach', title: 'Coach' },
                    { id: 'school', title: 'School' },
                    { id: 'sponsor', title: 'Sponsor' },
                    { id: 'admin', title: 'Super Admin' },
                  ].map((r) => (
                    <label
                      key={r.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                        newRoleSelection === r.id
                          ? 'border-[#032D59] bg-blue-50/50 text-[#032D59]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{r.title}</span>
                      <input
                        type="radio"
                        name="newRole"
                        value={r.id}
                        checked={newRoleSelection === r.id}
                        onChange={() => setNewRoleSelection(r.id as any)}
                        className="accent-[#032D59]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditRoleModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveRoleChange}
                  className="px-4 py-2 rounded-lg bg-[#032D59] hover:bg-[#0B5FA5] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Save New Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
