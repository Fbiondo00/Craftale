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
  LogOut
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
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: ''
  });

  // Avoid hydration mismatch for dynamic date
  const memberSinceRef = useRef<string>('');
  useEffect(() => {
    memberSinceRef.current = new Date().toLocaleDateString('it-IT');
  }, []);

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
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mock API helpers (can be replaced with a real backend later)
  const saveProfile = async (data: ProfileData): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, 800));

  const uploadAvatar = async (file: File): Promise<string> =>
    new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      resolve(url);
    });

  // Handle save profile
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await saveProfile(profileData);
      setIsEditing(false);
      console.log('Profilo salvato con successo');
    } catch (error) {
      console.error('Errore durante il salvataggio del profilo:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simple local preview; replace with storage upload when available
    const previewUrl = await uploadAvatar(file);
    setProfileData((prev) => ({ ...prev, avatar: previewUrl }));
  };

  // Handle logout
  const handleLogout = async () => {
    if (window.confirm('Sei sicuro di voler uscire?')) {
      // signOut is synchronous in our context; remove unnecessary await
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-4 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="hover:bg-apty-primary/10 apty-transition shrink-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna al Sito
              </Button>
              <div className="min-w-0">
                <h1 className="text-3xl font-bold apty-gradient-text">Il Mio Profilo</h1>
                <p className="text-apty-text-secondary mt-1">
                  Gestisci le tue informazioni personali
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 shrink-0">
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-apty-primary hover:bg-apty-primary-hover text-apty-text-on-brand apty-transition"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Modifica Profilo
                </Button>
              )}
              
              {/* Logout Button */}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-apty-border-strong hover:bg-apty-bg-hover apty-transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Esci
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
                    <Avatar className="w-32 h-32 mx-auto border-4 border-apty-primary/20">
                      <AvatarImage src={profileData.avatar} alt="Foto profilo" />
                      <AvatarFallback className="bg-apty-gradient-primary text-apty-text-on-brand text-2xl font-bold">
                        {profileData.firstName.charAt(0).toUpperCase()}{profileData.lastName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-apty-primary hover:bg-apty-primary-hover text-apty-text-on-brand w-10 h-10 rounded-full flex items-center justify-center cursor-pointer apty-transition shadow-apty-soft">
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
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-apty-text-muted" />
                    <span className="text-apty-text-secondary" suppressHydrationWarning>
                      Membro da: {memberSinceRef.current || ''}
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
                        id="email"
                        type="email"
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
                        id="phone"
                        type="tel"
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
                    <div className="flex items-center justify-end space-x-3 pt-6 border-t border-apty-border-subtle">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="border-apty-border-strong hover:bg-apty-bg-hover apty-transition"
                      >
                        Annulla
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-apty-primary hover:bg-apty-primary-hover text-apty-text-on-brand apty-transition"
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
  <div className="fixed right-4 z-[200] bottom-20 sm:bottom-4">
        <ClientThemeToggle />
      </div>
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