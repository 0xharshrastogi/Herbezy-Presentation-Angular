import { FormGroup } from '@angular/forms';

import { TFormStructure } from '@common/types';

export abstract class AbstractFormBuilder<T> {
	public abstract createForm(): FormGroup<TFormStructure<T>>;
}
