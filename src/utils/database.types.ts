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
          image: string | null
          name: string
          pet_name: string | null
          type: string
        }
        Insert: {
          contact: string
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name: string
          pet_name?: string | null
          type: string
        }
        Update: {
          contact?: string
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          pet_name?: string | null
          type?: string
        }
        Relationships: []
      }
      Missing: {
        Row: {
          created_at: string
          description: string
          id: number
          image: string | null
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          image?: string | null
          name: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          image?: string | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      Wish: {
        Row: {
          contact: string | null
          created_at: string
          description: string
          id: number
          name: string
          type: string
        }
        Insert: {
          contact?: string | null
          created_at?: string
          description: string
          id?: number
          name: string
          type: string
        }
        Update: {
          contact?: string | null
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
