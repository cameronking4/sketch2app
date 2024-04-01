import React from 'react';
import Main from "./components/MainCmp";
import { checkAccess } from '../actions';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const Page = async () => {
	const uid = cookies().get("session-cookie").value.toString();
	const access = await checkAccess(uid);

	if (!access.success) {
		redirect('/subscribe');
	}

	return (
		<Main apiKey={access.apiKey} />
	);
}

export default Page;
