#!/bin/bash
# Quick script to add environment variables to Vercel
# Run this with: bash setup-vercel-env.sh

echo "Adding environment variables to Vercel..."

vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development << ENVEOF
https://vmhsswmsxhdahnaqztlt.supabase.co
ENVEOF

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development << ENVEOF
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaHNzd21zeGhkYWhuYXF6dGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTIzMTksImV4cCI6MjA3Nzk2ODMxOX0.QI58fPKSx2KmCG-PI2T3l7RMAeJHjy_IZM6ovcfaJmQ
ENVEOF

vercel env add NEXT_PUBLIC_PLAUSIBLE_DOMAIN production preview development << ENVEOF
constructiveblueprint.com
ENVEOF

echo "✅ Done! Environment variables added to Vercel."
echo "Now create your PR and Vercel will automatically deploy!"
