import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface SectionsContent {
  hero?: {
    title?: string;
    subtitle?: string;
    badge?: string;
  };
  diagnosis?: {
    eyebrow?: string;
    title?: string;
    intro?: string;
    alert_title?: string;
  };
  opportunity?: {
    eyebrow?: string;
    title?: string;
    footnote?: string;
    quote_author?: string;
    highlight?: string;
  };
  strategy?: {
    eyebrow?: string;
    title?: string;
    intro?: string;
    steps?: Array<{ num: number; title: string; desc: string; color: string }>;
    components?: Array<{ name: string; desc: string; tag: string; tagColor: string }>;
  };
  plans?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    notes?: string[];
  };
  closing?: {
    eyebrow?: string;
    extra_quote?: string;
    deadline_text?: string;
    button_text?: string;
  };
}

export interface ProposalData {
  id: string
  slug: string
  client_name: string
  client_company: string
  agent_name: string
  whatsapp_number: string
  start_date: string
  deadline_date: string
  expiry_date: string
  deadline_iso: string
  diagnosis: { label: string; detail: string }[]
  urgency_text: string
  stats: { number: string; label: string }[]
  opportunity_quote: string
  plans: {
    name: string
    eyebrow?: string
    price: string
    priceNote?: string
    adBudget: string
    months: string
    includes: string[]
    excludes: string[]
    isRecommended: boolean
    buttonText?: string
  }[]
  recommendation_text: string
  closing_headline: string
  closing_body: string
  ai_client_context: string
  terms_url: string
  is_active: boolean
  views_count: number
  approved_at: string | null
  created_at: string
  expires_at: string | null
  sections: SectionsContent | null
}

export function useProposal(slug: string) {
  const [proposal, setProposal] = useState<ProposalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    async function fetchProposal() {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) {
        setError(error)
      } else {
        setProposal(data as unknown as ProposalData)
        await supabase
          .from('proposals')
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq('slug', slug)
      }
      setLoading(false)
    }

    if (slug) fetchProposal()
  }, [slug])

  return { proposal, loading, error }
}
