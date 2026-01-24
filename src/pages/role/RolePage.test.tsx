import {screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RolePage} from './RolePage';
import * as roleCategoryApi from '../../api/roleCategory';
import * as roleApi from '../../api/role';
import {vi} from 'vitest';
import {renderWithQueryClient} from '../../test-utils/RenderWithQueryClient';
import type {RoleCategory} from "../../model/roleCategory.ts";

vi.mock('../../api/roleCategory');
vi.mock('../../api/role');

describe('RolePage', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should create a new role when selected category has no existing roles', async () => {
        const categories: RoleCategory[] = [
            {id: '1', name: 'Engineering'},
            {id: '2', name: 'Marketing'},
        ];

        vi.mocked(roleCategoryApi.findAllCategories).mockResolvedValue(categories);

        vi.mocked(roleApi.getRolesByCategoryId)
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([
                {id: '1', name: 'Frontend Developer', roleCategory: {id: '1', name: 'Engineering'}},
            ]);

        vi.mocked(roleApi.createRole).mockResolvedValue({
            id: '1',
            name: 'Frontend Developer',
            roleCategory: {id: '1', name: 'Engineering'},
        });

        await renderComponent();

        await selectCategory('Engineering');

        await fillAndSubmitRole();

        await waitFor(() => {
            expect(within(screen.getByTestId("role-table")).getByText('Frontend Developer')).toBeInTheDocument();
        });
    });

    it('should create a new role when selected category has existing roles', async () => {
        const categories = [
            {id: '1', name: 'Engineering'},
            {id: '2', name: 'Marketing'},
        ];

        const initialRoles = [
            {id: '1', name: 'Backend Developer', roleCategory: {id: '1', name: 'Engineering'}},
            {id: '2', name: 'DevOps Engineer', roleCategory: {id: '1', name: 'Engineering'}},
        ];

        const updatedRoles = [
            ...initialRoles,
            {id: '3', name: 'Frontend Developer', roleCategory: {id: '1', name: 'Engineering'}},
        ];

        vi.mocked(roleCategoryApi.findAllCategories).mockResolvedValue(categories);

        vi.mocked(roleApi.getRolesByCategoryId)
            .mockResolvedValueOnce(initialRoles)
            .mockResolvedValueOnce(updatedRoles);

        vi.mocked(roleApi.createRole).mockResolvedValue({
            id: '3',
            name: 'Frontend Developer',
            roleCategory: {id: '1', name: 'Engineering'},
        });

        await renderComponent();

        await selectCategory('Engineering');

        await fillAndSubmitRole();

        await waitFor(() => {
            expect(screen.getByText('Backend Developer')).toBeInTheDocument();
            expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
            expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        });
    });

    it('should switch between categories and display their respective roles', async () => {
        const categories = [
            {id: '1', name: 'Engineering'},
            {id: '2', name: 'Marketing'},
        ];

        const engineeringRoles = [
            {id: '1', name: 'Backend Developer', roleCategory: {id: '1', name: 'Engineering'}},
            {id: '2', name: 'Frontend Developer', roleCategory: {id: '1', name: 'Engineering'}},
        ];

        const marketingRoles = [
            {id: '3', name: 'SEO Specialist', roleCategory: {id: '2', name: 'Marketing'}},
            {id: '4', name: 'Content Writer', roleCategory: {id: '2', name: 'Marketing'}},
        ];

        vi.mocked(roleCategoryApi.findAllCategories).mockResolvedValue(categories);

        vi.mocked(roleApi.getRolesByCategoryId)
            .mockResolvedValueOnce(engineeringRoles)
            .mockResolvedValueOnce(marketingRoles);

        await renderComponent();

        await selectCategory('Engineering');

        await waitFor(() => {
            expect(screen.getByText('Backend Developer')).toBeInTheDocument();
            expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        });
        expect(screen.queryByText('SEO Specialist')).not.toBeInTheDocument();
        expect(screen.queryByText('Content Writer')).not.toBeInTheDocument();

        await selectCategory('Marketing');

        await waitFor(() => {
            expect(screen.getByText('SEO Specialist')).toBeInTheDocument();
            expect(screen.getByText('Content Writer')).toBeInTheDocument();
        });
        expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument();
        expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
    });

    async function renderComponent() {
        renderWithQueryClient(<RolePage/>);
        await waitFor(() => screen.getByTestId("select-role-category"));
    }

    async function selectCategory(categoryText: string) {
        await userEvent.click(screen.getByRole('combobox'));
        const engineeringTextElement = await waitFor(() => screen.getByText(categoryText));
        await userEvent.click(engineeringTextElement);
    }

    async function fillAndSubmitRole() {
        const nameInput = within(screen.getByTestId("role-name-input")).getByRole('textbox');
        await userEvent.type(nameInput, 'Frontend Developer');
        const createButton = screen.getByTestId("create-role-button");
        await userEvent.click(createButton);
    }
});