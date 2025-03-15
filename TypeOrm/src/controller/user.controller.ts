import express from 'express';
import { Router } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

const router = Router();
const repo = AppDataSource.getRepository(User);


export default router;
 // Define Routes
    // Create a new user
    router.post('/register', async (req, res) => {
        const { firstName, lastName, email, passwordHash, title } = req.body;

        if (!firstName || !lastName || !email || !passwordHash || !title) {
         res.status(400).json({ message: 'Missing required fields' });
        }

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.passwordHash = passwordHash;
        user.title = title;

        try {
            await repo.manager.save(user);
            res.status(201).json({ message: 'User created', user });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    });

    // Get all users
    router.get('/users', async (req, res) => {
        try {
            const users = await repo.manager.find(User);
            res.json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ message: 'Error getting users', error });
        }
    });

    // Get user by id
    router.get('/users/:id', async (req, res) => {
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
          res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const user = await repo.manager.findOneBy(User, { id: userId });

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ message: 'Error getting user', error });
        }
    });

    //update user
    router.put('/users/:id', async (req, res) => {
        const userId = parseInt(req.params.id);
        const { firstName, lastName, email, passwordHash, title } = req.body;

        if (isNaN(userId)) {
          res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const user = await repo.manager.findOneBy(User, { id: userId });

            if (!user) {
                 res.status(404).json({ message: 'User not found' });
            }

            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.passwordHash = passwordHash || user.passwordHash;
            user.title = title || user.title;

            await repo.manager.save(user);
            res.json({ message: 'User updated', user });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Error updating user', error });
        }
    });

    //delete user
    router.delete('/users/:id', async (req, res) => {
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
         res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const user = await repo.manager.findOneBy(User, { id: userId });

            if (!user) {
                 res.status(404).json({ message: 'User not found' });
            }

            await AppDataSource.manager.remove(user);
            res.json({ message: 'User deleted' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user', error });
        }
    });