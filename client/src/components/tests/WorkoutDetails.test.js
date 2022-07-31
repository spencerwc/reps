import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'; 
import "@testing-library/jest-dom";
import WorkoutDetails from '../WorkoutDetails';

const seedWorkoutOne = {
    _id: 'workoutOne',
    title: 'Punch Training',
    exercises: [{
        _id: 'ex0',
        name:  'Pushup',
    }, {
        _id: 'ex1',
        name: 'Situp'
    }, {
        _id: 'ex2',
        name: 'Air Squat'
    }],
    notes: 'Added 10-km run at the end',
    weights: [100, 123, 135],
    sets: [10, 10, 10],
    reps: [10, 10, 10]
}

const seedWorkoutTwo = {
    _id: 'workoutTwo',
    title: 'Running up that hill',
    exercises: [{
        _id: 'ex3',
        name: 'Running'
    }],
    weights: [1],
    sets: [2],
    reps: [3],
}

const Wrapper = ({ children }) => {
    return (
        <MemoryRouter>
            {children}
        </MemoryRouter>
    );
}

describe('Workout Details component', () => {
    it('renders a list item', () => {
        render(<WorkoutDetails workout={seedWorkoutOne} />, { wrapper: Wrapper});
        expect(screen.getByRole('listitem')).toBeInTheDocument(); 
    });

    it ('renders the workout title', () => {
        render(<WorkoutDetails workout={seedWorkoutOne} />, { wrapper: Wrapper});
        expect(screen.getByText(seedWorkoutOne.title)).toBeInTheDocument();
    });

    it('renders workout notes paragraph', () => {
        render(<WorkoutDetails workout={seedWorkoutOne} />, { wrapper: Wrapper});
        expect(screen.getByText(seedWorkoutOne.notes)).toBeInTheDocument();
    });

    it('does not render notes paragraph if notes are not included', () => {
        render(<WorkoutDetails workout={seedWorkoutTwo} />, { wrapper: Wrapper});
        expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    });

    it('renders exercises table', () => {
        render(<WorkoutDetails workout={seedWorkoutTwo} />, { wrapper: Wrapper});
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('lists all exercises in the table', () => {
        render(<WorkoutDetails workout={seedWorkoutOne} />, { wrapper: Wrapper});

        expect(screen.getByText(seedWorkoutOne.exercises[0].name)).toBeInTheDocument();
        expect(screen.getByText(seedWorkoutOne.exercises[1].name)).toBeInTheDocument();
        expect(screen.getByText(seedWorkoutOne.exercises[2].name)).toBeInTheDocument();
    });
});