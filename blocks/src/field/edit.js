// Import WordPress dependencies.
import {
	InspectorControls,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

// Import internal dependencies.
import ObsidianFieldToolbar from './components/ObsidianFieldToolbar';
import ObsidianFieldSettings from './components/ObsidianFieldSettings';
import ObsidianFieldCheckbox from './fields/Checkbox';
import ObsidianFieldInput from './fields/Input';
import ObsidianFieldRadio from './fields/Radio';
import ObsidianFieldSelect from './fields/Select';
import ObsidianFieldTextarea from './fields/Textarea';
import { fieldTypeOptions } from './data/FieldTypeOptions';

/**
 * Edit function for the obsidian form block. Returns markup for the editor.
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context passed to the block.
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	// Destructure the props.
	const { attributes, setAttributes, context } = props;

	// Destructure the attributes.
	const { fieldType, fieldWidth } = attributes;

	// Get the required indicator and global placeholder settings.
	const requiredIndicator =
		context[ 'obsidian-form/formSettings' ].requiredIndicator.value;
	const globalHasPlaceholder =
		context[ 'obsidian-form/formSettings' ].globalHasPlaceholder.value;
	const globalDescriptionPlacement =
		context[ 'obsidian-form/formSettings' ].descriptionPlacement.value;

	/**
	 * Handle label change.
	 *
	 * This function updates the field label and field name attributes.
	 * The field name is generated by stripping special characters and replacing spaces with underscores.
	 *
	 * @param {string} value The new value.
	 *
	 * @return {void}
	 */
	const handleLabelChange = ( value ) => {
		setAttributes( { fieldLabel: value } );
		setAttributes( {
			// Strip special characters and replace spaces with underscores.
			fieldName: value
				.toLowerCase()
				.replace( /[^a-zA-Z0-9]/g, '' )
				.replace( /\s+/g, '_' ),
		} );
	};

	/**
	 * Handle attribute change.
	 *
	 * @param {string} value     The new value.
	 * @param {string} attribute The attribute to update.
	 *
	 * @return {void}
	 */
	const handleAttributeChange = ( value, attribute ) => {
		setAttributes( { [ attribute ]: value } );
	};

	/**
	 * Handle description change.
	 *
	 * @param {string} value     The new value.
	 *
	 * @return {void}
	 */
	const handleDescriptionChange = ( value ) => {
		setAttributes( { fieldDescription: value } );
	};

	/**
	 * Handle field option change.
	 *
	 * @param {Array} value The new value.
	 *
	 * @return {void}
	 */
	const handleFieldOptionChange = ( value ) => {
		setAttributes( { fieldOptions: value } );
	};

	/**
	 * Handle extra props change.
	 *
	 * @param {string} value     The new value.
	 * @param {string} attribute The attribute to update.
	 *
	 * @return {void}
	 */
	const handleExtraPropsChange = ( value, attribute ) => {
		setAttributes( {
			extraProps: {
				...attributes.extraProps,
				[ attribute ]: value,
			},
		} );
	};

	// Set the flex property based on the field width.
	const flexProperty = fieldWidth !== '' ? `0 0 ${ fieldWidth }` : '1 1 auto';

	// Set the block props.
	const blockProps = useBlockProps( {
		style: {
			flex: flexProperty,
		},
	} );

	setAttributes( {
		formId: context[ 'obsidian-form/formSettings' ].id.value,
	} );

	return (
		<>
			<BlockControls>
				<ObsidianFieldToolbar
					attributes={ attributes }
					handleAttributeChange={ handleAttributeChange }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody>
					<ObsidianFieldSettings
						attributes={ attributes }
						handleLabelChange={ handleLabelChange }
						handleDescriptionChange={ handleDescriptionChange }
						handleAttributeChange={ handleAttributeChange }
						handleFieldOptionChange={ handleFieldOptionChange }
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody>
					<UnitControl
						label="Field Width"
						value={ fieldWidth }
						onChange={ ( value ) =>
							setAttributes( { fieldWidth: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ fieldTypeOptions.filter(
					( option ) => option.value === fieldType
				)[ 0 ].component === 'input' && (
					<ObsidianFieldInput
						attributes={ attributes }
						globalHasPlaceholder={ globalHasPlaceholder }
						requiredIndicator={ requiredIndicator }
						handleLabelChange={ handleLabelChange }
						globalDescriptionPlacement={ globalDescriptionPlacement }
						handleDescriptionChange={ handleDescriptionChange }
					/>
				) }

				{ fieldTypeOptions.filter(
					( option ) => option.value === fieldType
				)[ 0 ].component === 'textarea' && (
					<ObsidianFieldTextarea
						attributes={ attributes }
						globalHasPlaceholder={ globalHasPlaceholder }
						requiredIndicator={ requiredIndicator }
						handleLabelChange={ handleLabelChange }
						globalDescriptionPlacement={ globalDescriptionPlacement }
						handleDescriptionChange={ handleDescriptionChange }
					/>
				) }

				{ fieldTypeOptions.filter(
					( option ) => option.value === fieldType
				)[ 0 ].component === 'select' && (
					<ObsidianFieldSelect
						attributes={ attributes }
						globalHasPlaceholder={ globalHasPlaceholder }
						requiredIndicator={ requiredIndicator }
						handleLabelChange={ handleLabelChange }
						globalDescriptionPlacement={ globalDescriptionPlacement }
						handleDescriptionChange={ handleDescriptionChange }
						handleFieldOptionChange={ handleFieldOptionChange }
					/>
				) }

				{ fieldTypeOptions.filter(
					( option ) => option.value === fieldType
				)[ 0 ].component === 'checkbox' && (
					<ObsidianFieldCheckbox
						attributes={ attributes }
						requiredIndicator={ requiredIndicator }
						handleLabelChange={ handleLabelChange }
						globalDescriptionPlacement={ globalDescriptionPlacement }
						handleDescriptionChange={ handleDescriptionChange }
						handleExtraPropsChange={ handleExtraPropsChange }
						handleFieldOptionChange={ handleFieldOptionChange }
					/>
				) }

				{ fieldTypeOptions.filter(
					( option ) => option.value === fieldType
				)[ 0 ].component === 'radio' && (
					<ObsidianFieldRadio
						attributes={ attributes }
						requiredIndicator={ requiredIndicator }
						handleLabelChange={ handleLabelChange }
						globalDescriptionPlacement={ globalDescriptionPlacement }
						handleDescriptionChange={ handleDescriptionChange }
						handleExtraPropsChange={ handleExtraPropsChange }
						handleFieldOptionChange={ handleFieldOptionChange }
					/>
				) }
			</div>
		</>
	);
}
