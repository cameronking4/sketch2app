import { cookies } from 'next/headers';
import SubForm from "./components/SubForm";
import { getSubscriptionData } from "../../actions";

const Page = async () => {
  const uid = cookies().get("session-cookie").value.toString();
	const subData = await getSubscriptionData(uid);

  return (
    <div className="container px-6 py-20">
      <div className="flex flex-wrap items-center justify-center lg:justify-between">
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src="/subscribe.png"
            className="w-full"
            alt="Phone image" />
        </div>

        <SubForm uid={uid} subData={subData} />
      </div>
    </div>
  );
}

export default Page;
