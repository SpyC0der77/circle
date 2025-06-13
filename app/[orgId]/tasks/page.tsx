import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/tasks/header';
import AllTasks from '@/components/common/tasks/all-tasks';

export default function TasksPage({ searchParams }: { searchParams?: { label?: string } }) {
  const label = Array.isArray(searchParams?.label) ? searchParams?.label[0] : searchParams?.label;
  return (
    <MainLayout header={<Header />}>
      <AllTasks initialLabel={label} />
    </MainLayout>
  );
}
