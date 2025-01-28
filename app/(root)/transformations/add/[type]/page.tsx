import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: {type}}:
  SearchParamProps) => {
    const { userId } = await auth();
    const tramsformation = transformationTypes[type];

    if(!userId) {
      redirect('/sign-in');
      return;
    }

    const user = await getUserById(userId);

  return (
    <>
      <Header 
    title={tramsformation.title}
    subtitle={tramsformation.subTitle} 
    />

    <TransformationForm 
      action="Add"
      userId={user._id}
      type={transformationTypes[type].type as 
      TransformationTypeKey}
      creditBalance={user.creditBalance}
    />
    </>

  )  
}

export default AddTransformationTypePage