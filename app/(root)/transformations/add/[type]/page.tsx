import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

declare type TransformationTypeKey = "restore" | "removeBackground" | "fill" | "remove" | "recolor";

declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
};

const AddTransformationTypePage = async ({ params, searchParams }: SearchParamProps) => {
  // Extracting id and type from params
  const { id, type } = params;

  // Getting the userId from the auth function
  const { userId } = await auth();
  
  // Getting the transformation object based on the type
  const transformation = transformationTypes[type];

  // Redirecting to sign-in page if userId is not available
  if (!userId) redirect('/sign-in');

  // Fetching the user details based on userId
  const user = await getUserById(userId);

  // Returning the JSX for the page
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;