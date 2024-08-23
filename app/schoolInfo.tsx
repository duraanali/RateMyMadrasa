'use client';

import { useState } from 'react';
import { supabase } from './supabaseClient';
import { useRouter } from 'next/navigation';

export default function SchoolInfo() {
  const [schoolForm, setSchoolForm] = useState({
    name: '',
    image: '',
    hoursOpen: '',
    programs: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchoolForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!schoolForm.name) {
      setError('School name is required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('schools')
        .insert([
          {
            name: schoolForm.name,
            image: schoolForm.image,
            hours_open: schoolForm.hoursOpen,
            programs: schoolForm.programs,
          },
        ]);

      if (error) throw error;

      // Redirect or show success message
      router.push('/school-added-success');
    } catch (err) {
      setError('An error occurred while adding the school');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add School Information
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="school-name" className="sr-only">
                School Name
              </label>
              <input
                id="school-name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="School Name"
                value={schoolForm.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="image-url" className="sr-only">
                Image URL
              </label>
              <input
                id="image-url"
                name="image"
                type="url"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Image URL"
                value={schoolForm.image}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="hours-open" className="sr-only">
                Hours Open
              </label>
              <input
                id="hours-open"
                name="hoursOpen"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Hours Open"
                value={schoolForm.hoursOpen}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="programs" className="sr-only">
                Programs
              </label>
              <textarea
                id="programs"
                name="programs"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Programs"
                value={schoolForm.programs}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
