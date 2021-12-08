import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import * as Yup from "yup";

export default function ContactForm({ setPop }) {
	const [FormData, setFormData] = useState();
	var apiContactFormData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		if (apiContactFormData.length !== 0) {
			setFormData(apiContactFormData.gravityFormsForm.formFields.nodes);
		}
	}, [apiContactFormData]);

	const createRequest = (values) => {
		const QUERY_3 =
			`
			mutation SupportSiteForm {
			__typename
			submitGravityFormsForm(
			input: {
				formId: 2
				clientMutationId: "123abc"
				fieldValues: [
				{
					id: 11
					value: "` +
			values[`field_11`] +
			`"
				}
				{
					id: 12
					value: "` +
			values[`field_12`] +
			`"
				}
				{
					id: 4
					emailValues: {
						value: "` +
			values[`field_4`] +
			`"
					}
				}
				{
					id: 9
					value: "` +
			values[`field_9`] +
			`"
				}
				{
					id: 6
					value: "` +
			values[`field_6`] +
			`"
				}
				{
					id: 10
					value: "` +
			values[`field_10`] +
			`"
				}
				{
					id: 7
					value: "` +
			values[`field_7`] +
			`"
				}
				]
				ip: "" # IP address
				saveAsDraft: false # If true, the submission will be saved as a draft entry.
				# Set the following to validate part of a multipage form without saving the submission.
				sourcePage: 1
				targetPage: 0
			}
			) {
			errors {
				id # The field that failed validation.
				message
			}
			entryId # Will return null if submitting a draft entry
			resumeToken # Will return null if submitting an entry.
			entry {
				# See above section on querying Entries.
				id
			}
			}
		}
		`;
		axios
			.post(GRAPHQL_API, { query: QUERY_3 }, values)
			.then((res) => {
				console.log("responseData", res);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};

	const formSubmit = (values) => {
		createRequest(values);
	};

	const formik = useFormik({
		initialValues: {
			field_11: "",
			field_12: "",
			field_4: "",
			field_6: "",
			field_10: "",
			field_7: "",
			field_9: "",
		},
		validationSchema: Yup.object({
			field_11: Yup.string().required("First Name is required."),
			field_12: Yup.string().required("Last Name is required."),
			field_4: Yup.string().email("Enter a valid email")
			.required("Email is required"),
			field_6: Yup.string().required("Website URL is required."),
			field_10: Yup.string().required("Topic is required."),
			field_7: Yup.string().required("Topic is required."),
			field_9: Yup.string().required("Inquiry field is required."),
		}),
		onSubmit: (values) => {
			formSubmit(values);
			setPop(false);
		},
	});

	return (
		<div className="contact-form-wrapper">
			<span className="dshap">
				<img
					src={require("../assets/images/d-shap.svg").default}
					alt="d-shap"
				/>
			</span>
			<form onSubmit={formik.handleSubmit}>
				<h2>Get in touch with us.</h2>
				{FormData !== undefined
					? FormData.map((item, index) => {
							return item.choices === undefined ? (
								index === 6 ? (
									<div className="form-block full" key={index}>
										<label htmlFor={item.label}>
											{item.label} <span className="required">*</span>
										</label>
										<textarea
											type={item.type === "website" ? "text" : item.type}
											name={item.label}
											id={item.id}
											placeholder={item.placeholder}
											{...formik.getFieldProps(`field_${item.id}`)}
										/>
										{formik.touched[`field_${item.id}`] &&
										formik.errors[`field_${item.id}`] ? (
											<div class="error-msg">
												{formik.errors[`field_${item.id}`]}
											</div>
										) : null}
									</div>
								) : (
									<div className="form-block" key={index}>
										<label htmlFor={item.label}>
											{item.label} <span className="required">*</span>
										</label>
										<input
											type={item.type === "website" ? "text" : item.type}
											name={item.label}
											id={item.id}
											placeholder={item.placeholder}
											{...formik.getFieldProps("field_" + item.id)}
										/>
										{formik.touched[`field_${item.id}`] &&
										formik.errors[`field_${item.id}`] ? (
											<div class="error-msg">
												{formik.errors[`field_${item.id}`]}
											</div>
										) : null}
									</div>
								)
							) : (
								<div className="form-block" key={index}>
									<label htmlFor="question">
										What best describes your inquiry?
										<span className="required">*</span>
									</label>
									<div className="lp-select">
										<select
											id="question"
											{...formik.getFieldProps("field_" + item.id)}
										>
											{item.choices.map((subItem, subIndex) => {
												return (
													<option value={subItem.value} key={subIndex}>
														{subItem.text}
													</option>
												);
											})}
										</select>
									</div>
									{formik.touched[`field_${item.id}`] &&
									formik.errors[`field_${item.id}`] ? (
										<div className="error-msg">
											{formik.errors[`field_${item.id}`]}
										</div>
									) : null}
								</div>
							);
					  })
					: null}
				<div className="form-submit">
					<input type="submit" defaultValue="Submit" className="btn-large" />
				</div>
			</form>
		</div>
	);
}
