type FormAction =
	| {
			type: "SET_FIELD";
			fieldName: string;
			value: string;
	  }
	| {
			type: "SET_ERROR";
			fieldName: string;
			errors: string[];
	  }
	| {
			type: "RESET";
			fields: Record<string, string>;
			errors: Record<string, string[]>;
	  };

export type { FormAction };
