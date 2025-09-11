"use client";
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface BackConfirmDialogProps {
  open: boolean;
  saving: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void; // explicit cancel handler
  currentStepLabel?: string;
  targetStepLabel?: string;
}

export const BackConfirmDialog: React.FC<BackConfirmDialogProps> = ({
  open,
  saving,
  onOpenChange,
  onSave,
  onDiscard,
  onCancel,
  currentStepLabel = 'step corrente',
  targetStepLabel = 'step precedente'
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl border border-color-default p-6 focus:outline-none">
          <Dialog.Title className="text-lg font-semibold text-color-strong mb-1">
            Torna indietro?
          </Dialog.Title>
          <Dialog.Description className="text-sm text-color-secondary mb-4 leading-relaxed">
            Stai lasciando il {currentStepLabel}. Vuoi salvare i progressi prima di tornare allo {targetStepLabel}? Puoi anche scegliere di non salvare e continuare.
          </Dialog.Description>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent text-white text-sm font-medium py-2.5 shadow-md hover:opacity-95 disabled:opacity-60 transition"
            >
              {saving ? 'Salvataggio...' : 'Salva e torna indietro'}
            </button>
            <button
              type="button"
              onClick={onDiscard}
              disabled={saving}
              className="w-full inline-flex items-center justify-center rounded-md border border-color-strong/40 bg-white text-color-strong text-sm font-medium py-2.5 hover:bg-color-subtle disabled:opacity-60 transition"
            >
              Non salvare
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-color-subtle text-color-secondary text-sm font-medium py-2.5 hover:bg-color-muted disabled:opacity-60 transition"
            >
              Annulla
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BackConfirmDialog;