'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import moment from 'moment';

export default function InterviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = params?.interview_id;
  const [interview, setInterview] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (interviewId) fetchDetails();
    // eslint-disable-next-line
  }, [interviewId]);

  const fetchDetails = async () => {
    setLoading(true);
    // Fetch interview
    const { data: interviewData, error: interviewError } = await supabase
      .from('Interviews')
      .select('*')
      .eq('id', interviewId)
      .single();
    if (interviewError) {
      setInterview(null);
      setLoading(false);
      return;
    }
    setInterview(interviewData);
    // Fetch results
    const { data: resultsData } = await supabase
      .from('interview_results')
      .select('*')
      .eq('interview_id', interviewId);
    setResults(resultsData || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="text-center py-16">
        <XCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Interview Not Found</h2>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Button onClick={() => router.back()} variant="outline" className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {interview.title || interview.name || 'Untitled Interview'}
          </CardTitle>
          <CardDescription>
            Created by: <span className="font-medium">{interview.userEmail || interview.email || 'Unknown'}</span>
            <span className="ml-4 text-gray-500">{moment(interview.created_at).format('MMM DD, YYYY HH:mm')}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><span className="font-semibold">Description:</span> {interview.description || 'No description provided.'}</div>
          <div><span className="font-semibold">Interview ID:</span> {interview.id}</div>
          <div><span className="font-semibold">Total Candidates:</span> {results.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Results</CardTitle>
          <CardDescription>All candidates who participated in this interview</CardDescription>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-gray-500">No candidates have participated yet.</div>
          ) : (
            <div className="divide-y">
              {results.map((result) => (
                <div key={result.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-medium text-gray-900">{result.candidate_name || 'Unnamed Candidate'}</div>
                    <div className="text-xs text-gray-500">{result.candidate_email || 'No email'}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-semibold">Score:</span> {result.score ?? 'N/A'}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Status:</span> {result.status}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Duration:</span> {result.duration ? Math.round(result.duration / 60) + ' min' : 'N/A'}
                    </div>
                    {result.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 