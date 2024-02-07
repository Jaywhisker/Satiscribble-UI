import rightBar from '@/styles/components/rightSideBar/rightSideBar.module.css';

export interface errorInput {
    type: string;
}

export default function ErrorMessage(props: errorInput) {
    return (
        <>
            {props.type === "CuriousCat" ? (
                <p className={rightBar['rsb-errorTextSmall']}>
                    Oops! Something went wrong while generating a response.
                    <br />
                    Please try again.
                </p>
            ) : props.type === "Glossary" ? (
                <p className={rightBar['rsb-errorText']}>
                    Your glossary cannot be empty!
                </p>
            ) : null}
        </>
    );
}
