export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Adoption: {
        Row: {
          contact: string
          created_at: string
          description: string | null
          id: number
          image: string
          name: string
          petName: string
          type: string
        }
        Insert: {
          contact: string
          created_at?: string
          description?: string | null
          id?: number
          image: string
          name: string
          petName: string
          type: string
        }
        Update: {
          contact?: string
          created_at?: string
          description?: string | null
          id?: number
          image?: string
          name?: string
          petName?: string
          type?: string
        }
        Relationships: []
      }
      "Contact Us": {
        Row: {
          contact: string
          created_at: string
          id: number
          message: string
          name: string
        }
        Insert: {
          contact: string
          created_at?: string
          id?: number
          message: string
          name: string
        }
        Update: {
          contact?: string
          created_at?: string
          id?: number
          message?: string
          name?: string
        }
        Relationships: []
      }
      Missing: {
        Row: {
          contact: string
          created_at: string
          description: string
          id: number
          image: string
          lastSeen: string
          lat: number
          lng: number
          name: string
          petName: string
          type: string
        }
        Insert: {
          contact: string
          created_at?: string
          description: string
          id?: number
          image: string
          lastSeen: string
          lat: number
          lng: number
          name: string
          petName: string
          type: string
        }
        Update: {
          contact?: string
          created_at?: string
          description?: string
          id?: number
          image?: string
          lastSeen?: string
          lat?: number
          lng?: number
          name?: string
          petName?: string
          type?: string
        }
        Relationships: []
      }
      Wish: {
        Row: {
          contact: string
          created_at: string
          description: string
          id: number
          name: string
          type: string
        }
        Insert: {
          contact: string
          created_at?: string
          description: string
          id?: number
          name: string
          type: string
        }
        Update: {
          contact?: string
          created_at?: string
          description?: string
          id?: number
          name?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
