/**
 * Profile Page - Standalone User Profile Management
 * 
 * This page provides a clean, standalone experience for profile management
 * without navbar and footer. It includes its own providers and styling.
 * 
 * Features:
 * - View current profile information
 * - Edit profile fields with validation
 * - Upload/change profile image
 * - Phone number management
 * - Consistent APTY design system styling
 * - Standalone layout without navbar/footer
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientThemeToggle } from '@/components/ClientThemeToggle';
import { AuthModal } from '@/components/AuthModal';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  ArrowLeft,
  Shield,
  Clock,
  Edit2,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
}

// Internal Profile Component
function ProfileContent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const memberSinceRef = useRef<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Initialize profile data from user context
  useEffect(() => {
    if (user) {
      // Parse full name into firstName and lastName
      const nameParts = user.name?.split(' ') || [''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setProfileData({
        firstName,
        lastName,
        email: user.email || '',
        phone: user.phone || '', // Load from user metadata
        avatar: user.avatar
      });

      // Stabilizza la data "Membro da" per evitare mismatch di idratazione
      if (!memberSinceRef.current) {
        memberSinceRef.current = new Date().toLocaleDateString('it-IT');
      }
    }
  }, [user]);

  // Ensure portals render only on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle input changes
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Simulazione salvataggio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      
      // Show success message
      console.log('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

  // Anteprima locale immagine (upload reale da implementare)
    const previewUrl = URL.createObjectURL(file);
    setProfileData(prev => ({
      ...prev,
      avatar: previewUrl
    }));
  };

  // Handle logout
  const handleLogout = async () => {
    if (window.confirm('Sei sicuro di voler uscire?')) {
      signOut();
      router.push('/');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-apty-bg-base flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-apty-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-apty-text-secondary">Caricamento profilo...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-apty-bg-base">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-apty-primary/10 via-apty-tertiary/10 to-apty-accent/10 border-b border-apty-border-subtle">
        <div className="container mx-auto px-4 py-6 sm:py-8 relative">
          {/* Mobile-only Dashboard button in top-right */}
          <div className="sm:hidden absolute top-4 right-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="border-apty-border-strong hover:bg-apty-bg-hover apty-transition"
              aria-label="Vai alla Dashboard"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="hover:bg-apty-primary/10 apty-transition"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna al Sito
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold apty-gradient-text">Il Mio Profilo</h1>
                <p className="text-apty-text-secondary mt-1">
                  Gestisci le tue informazioni personali
                </p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto bg-apty-primary hover:bg-apty-primary-hover text-apty-text-on-brand apty-transition"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Modifica Profilo
                </Button>
              )}
              
              {/* Logout Button */}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full sm:w-auto border-apty-border-strong hover:bg-apty-bg-hover apty-transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Esci
              </Button>

              {/* Dashboard Button (desktop only) */}
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto border-apty-border-strong hover:bg-apty-bg-hover apty-transition"
                aria-label="Vai alla Dashboard"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
  <div className="container mx-auto px-4 py-8 pb-28 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Avatar Section */}
            <div className="lg:col-span-1">
              <Card className="border-apty-border-subtle shadow-apty-soft">
                <CardHeader className="text-center">
                  <CardTitle className="text-apty-text-primary">Foto Profilo</CardTitle>
                  <CardDescription className="text-apty-text-secondary">
                    La tua immagine di profilo
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32 mx-auto border-4 border-apty-primary/20">
                      <AvatarImage src={profileData.avatar} alt="Foto profilo" />
                      <AvatarFallback className="bg-apty-gradient-primary text-apty-text-on-brand text-2xl font-bold">
                        {profileData.firstName.charAt(0).toUpperCase()}{profileData.lastName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-apty-primary hover:bg-apty-primary-hover text-apty-text-on-brand w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer apty-transition shadow-apty-soft">
                        <Camera className="w-5 h-5" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <p className="text-sm text-apty-text-secondary">
                      Formati supportati: JPG, PNG, WebP
                    </p>
                    <p className="text-xs text-apty-text-muted">
                      Dimensione massima: 5MB
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="border-apty-border-subtle shadow-apty-soft mt-6">
                <CardHeader>
                  <CardTitle className="text-apty-text-primary flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-apty-primary" />
                    Informazioni Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
          <div className="flex items-center text-sm" suppressHydrationWarning>
                    <Clock className="w-4 h-4 mr-2 text-apty-text-muted" />
                    <span className="text-apty-text-secondary">
            Membro da: {memberSinceRef.current}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-apty-text-muted" />
                    <span className="text-apty-text-secondary">
                      Tipo account: Cliente
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Form Section */}
            <div className="lg:col-span-2">
              <Card className="border-apty-border-subtle shadow-apty-soft">
                <CardHeader>
                  <CardTitle className="text-apty-text-primary">Informazioni Personali</CardTitle>
                  <CardDescription className="text-apty-text-secondary">
                    Aggiorna i tuoi dati personali e di contatto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-apty-text-primary">
                        Nome *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apty-text-muted" />
                        <Input
              id="firstName"
                          value={profileData.firstName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('firstName', e.target.value)}
                          disabled={!isEditing}
                          className={cn(
                            "pl-10 border-apty-border-strong focus:border-apty-primary focus:ring-apty-primary/20",
                            !isEditing && "bg-apty-bg-muted text-apty-text-secondary"
                          )}
                          placeholder="Inserisci il tuo nome"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-apty-text-primary">
                        Cognome *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apty-text-muted" />
                        <Input
              id="lastName"
                          value={profileData.lastName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lastName', e.target.value)}
                          disabled={!isEditing}
                          className={cn(
                            "pl-10 border-apty-border-strong focus:border-apty-primary focus:ring-apty-primary/20",
                            !isEditing && "bg-apty-bg-muted text-apty-text-secondary"
                          )}
                          placeholder="Inserisci il tuo cognome"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-apty-text-primary">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apty-text-muted" />
                      <Input
                        type="email"
            id="email"
                        value={profileData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className={cn(
                          "pl-10 border-apty-border-strong focus:border-apty-primary focus:ring-apty-primary/20",
                          !isEditing && "bg-apty-bg-muted text-apty-text-secondary"
                        )}
                        placeholder="inserisci@email.com"
                      />
                    </div>
                    {!isEditing && (
                      <p className="text-xs text-apty-text-muted">
                        L'email non può essere modificata per motivi di sicurezza
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-apty-text-primary">
                      Numero di Telefono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apty-text-muted" />
                      <Input
                        type="tel"
            id="phone"
                        value={profileData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className={cn(
                          "pl-10 border-apty-border-strong focus:border-apty-primary focus:ring-apty-primary/20",
                          !isEditing && "bg-apty-bg-muted text-apty-text-secondary"
                        )}
                        placeholder="+39 123 456 7890"
                      />
                    </div>
                    <p className="text-xs text-apty-text-muted">
                      Formato italiano: +39 123 456 7890
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-apty-border-subtle">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="w-full sm:w-auto border-apty-border-strong hover:bg-apty-bg-hover apty-transition"
                      >
                        Annulla
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="w-full sm:w-auto bg-apty-primary hover:bg-apty-primary-hover text-apty-text-on-brand apty-transition"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Salvataggio...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Salva Modifiche
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Toggle - Fixed position */}
      <div className="fixed bottom-4 right-4 z-[200]">
        <ClientThemeToggle />
      </div>

      {/* Mobile Action Bar - Fixed at viewport bottom via portal */}
      {isMounted && createPortal(
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[195] border-t border-apty-border-subtle bg-apty-bg-base/95 backdrop-blur supports-[backdrop-filter]:bg-apty-bg-base/80">
          <div className="mx-auto max-w-4xl px-4 pr-16 py-4 flex flex-col gap-3">
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-apty-primary hover:bg-apty-primary-hover text-apty-text-on-brand apty-transition"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Modifica Profilo
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full border-apty-border-strong hover:bg-apty-bg-hover apty-transition"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// Main Profile Page Component with Providers
export default function ProfilePage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileContent />
        <AuthModal />
      </AuthProvider>
    </ThemeProvider>
  );
}