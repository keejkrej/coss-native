import * as React from 'react';

export type AutocompleteItemData = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type AutocompleteContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  items: AutocompleteItemData[];
  filteredItems: AutocompleteItemData[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  onItemSelect: (item: AutocompleteItemData) => void;
  disabled?: boolean;
};

export const AutocompleteContext = React.createContext<AutocompleteContextValue | null>(null);

export function useAutocompleteContext() {
  const context = React.useContext(AutocompleteContext);
  if (!context) {
    throw new Error('Autocomplete components must be used within Autocomplete.');
  }
  return context;
}

export function useAutocompleteFilter(items: AutocompleteItemData[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((item) => item.label.toLowerCase().includes(normalized));
}

export function useComboboxFilter(items: AutocompleteItemData[], query: string) {
  return useAutocompleteFilter(items, query);
}

export const AutocompletePrimitive = {
  useFilter: useAutocompleteFilter,
};

export const ComboboxPrimitive = {
  useFilter: useComboboxFilter,
};
