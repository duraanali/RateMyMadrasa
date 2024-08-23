'use client';

import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';

interface RatingFormData {
  schoolId: string;
  overallQuality: number;
  cleanliness: number;
  teacherQuality: number;
}

export default function RatingSystem() {
  const [ratingForm, setRatingForm] = useState<RatingFormData>({
    schoolId: '',
    overallQuality: 0,
    cleanliness: 0,
    teacherQuality: 0,
  });
  const [schools, setSchools] = useState<{ id: string; name: string }[]>([]);
  const toast = useToast();

  React.useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    const { data, error } = await supabase
      .from('schools')
      .select('id, name');
    if (error) {
      console.error('Error fetching schools:', error);
    } else {
      setSchools(data || []);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRatingForm(prev => ({ ...prev, [name]: name === 'schoolId' ? value : Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingForm.schoolId) {
      toast({
        title: 'Error',
        description: 'Please select a school',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ratings')
        .insert([
          {
            school_id: ratingForm.schoolId,
            overall_quality: ratingForm.overallQuality,
            cleanliness: ratingForm.cleanliness,
            teacher_quality: ratingForm.teacherQuality,
          },
        ]);

      if (error) throw error;

      toast({
        title: 'Rating submitted',
        description: 'Thank you for your feedback!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setRatingForm({
        schoolId: '',
        overallQuality: 0,
        cleanliness: 0,
        teacherQuality: 0,
      });
    } catch (err) {
      console.error('Error submitting rating:', err);
      toast({
        title: 'Error',
        description: 'An error occurred while submitting your rating',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" padding={4}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading>Rate a School</Heading>
        <FormControl isRequired>
          <FormLabel>Select School</FormLabel>
          <Select
            name="schoolId"
            value={ratingForm.schoolId}
            onChange={handleInputChange}
            placeholder="Select a school"
          >
            {schools.map(school => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Overall Quality</FormLabel>
          <Input
            type="number"
            name="overallQuality"
            min={1}
            max={5}
            value={ratingForm.overallQuality}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Cleanliness</FormLabel>
          <Input
            type="number"
            name="cleanliness"
            min={1}
            max={5}
            value={ratingForm.cleanliness}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Teacher Quality</FormLabel>
          <Input
            type="number"
            name="teacherQuality"
            min={1}
            max={5}
            value={ratingForm.teacherQuality}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Submit Rating
        </Button>
      </VStack>
    </Box>
  );
}
