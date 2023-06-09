import { type NextPage } from "next";
import Head from "next/head";
import CreateTodoForm from "~/components/CreateTodoForm";


const createTodo: NextPage = () => {
  
    return (
      <>
        <Head>
          <title>Create Todo</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div>
            <CreateTodoForm />
            </div>
        </main>
      </>
    );
  };
  
  export default createTodo;