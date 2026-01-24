import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoleCategoryPage } from './RoleCategoryPage';
import * as roleCategoryApi from '../../api/roleCategory';
import { vi } from 'vitest';
import {RenderWithQueryClient} from "../../test-utils/RenderWithQueryClient.tsx";
import type {RoleCategory} from "../../model/roleCategory.ts";

vi.mock('../../api/roleCategory');

describe('RoleCategoryPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it('should create a new category when no categories exist', async () => {
        vi.mocked(roleCategoryApi.findAllCategories)
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([
                { id: '1', name: 'Design' },
            ]);

        vi.mocked(roleCategoryApi.createRoleCategory).mockResolvedValue({
            name: 'Design',
        });

        render(<RoleCategoryPage />, { wrapper: RenderWithQueryClient });

        await fillNameAndSubmit();

        await waitFor(() => {
            expect(screen.getByText('Design')).toBeInTheDocument();
        });
    });

    it('should create a new category when existing categories are present', async () => {
        const initialCategories: RoleCategory[] = [
            { id: '1', name: 'Engineering' },
            { id: '2', name: 'Marketing' },
        ];

        const updatedCategories = [
            ...initialCategories,
            { id: '3', name: 'Design' },
        ];

        vi.mocked(roleCategoryApi.findAllCategories)
            .mockResolvedValueOnce(initialCategories)
            .mockResolvedValueOnce(updatedCategories);

        vi.mocked(roleCategoryApi.createRoleCategory).mockResolvedValue({
            name: 'Design',
        });

        render(<RoleCategoryPage />, { wrapper: RenderWithQueryClient });

        await fillNameAndSubmit();

        await waitFor(() => {
            expect(screen.getByText('Engineering')).toBeInTheDocument();
            expect(screen.getByText('Marketing')).toBeInTheDocument();
            expect(screen.getByText('Design')).toBeInTheDocument();
        });
    });

    async function fillNameAndSubmit() {
        const nameInput = screen.getByTestId('category-name-input');
        await userEvent.type(nameInput, 'Design');
        const createButton = screen.getByTestId('create-category-button');
        await userEvent.click(createButton);
    }
});