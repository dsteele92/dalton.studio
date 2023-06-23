import { React, useState } from 'react';
import axios from 'axios';
import Style from './form.module.scss';

export default function Form() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [topic, setTopic] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const [form, setForm] = useState('');

	const handleSumbit = (e) => {
		e.preventDefault();
		setForm('pending');
		var bodyFormData = new FormData();
		bodyFormData.append('firstName', firstName);
		bodyFormData.append('lastName', lastName);
		bodyFormData.append('topic', topic);
		bodyFormData.append('email', email);
		bodyFormData.append('message', message);

		axios({
			method: 'post',
			url: 'https://script.google.com/macros/s/AKfycbwxLYV3YhkaQPI7Sj20u69N3z1bz-nStKbqEN5CK48b4yrVt7OxvZtx_nDZMxYrXnxL/exec',
			data: bodyFormData,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then(function (response) {
				//handle success
				console.log(response);
				setForm('submitted');
			})
			.catch(function (response) {
				//handle error
				console.log(response);
				setForm('error');
			});
	};

	const handleSelect = (selection) => {
		if (selection !== topic) {
			setTopic(selection);
		} else {
			setTopic('');
		}
	};

	return (
		<div className={Style.FormContainer}>
			<form onSubmit={handleSumbit}>
				<div className={Style.Name}>
					<div className={Style.NameLabel}>
						<p>Name</p>
					</div>
					<input
						type='text'
						id='firstName'
						placeholder='First Name'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						type='text'
						id='lastName'
						placeholder='Last Name'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className={Style.Select}>
					<div className={Style.SelectLabel}>
						<p>Select a topic</p>
					</div>
					<div
						className={topic === 'Coding' ? Style.TopicSelected : Style.Topic}
						onClick={() => handleSelect('Coding')}>
						Coding
					</div>
					<div
						className={topic === 'Fitness' ? Style.TopicSelected : Style.Topic}
						onClick={() => handleSelect('Fitness')}>
						Fitness
					</div>
					<div
						className={topic === 'Other' ? Style.TopicSelected : Style.Topic}
						onClick={() => handleSelect('Other')}>
						Other
					</div>
				</div>
				<div className={Style.Email}>
					<div className={Style.EmailLabel}>
						<p>Email</p>
					</div>
					<input
						type='text'
						id='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className={Style.Message}>
					<div className={Style.MessageLabel}>
						<p>Message</p>
					</div>
					<textarea
						name='message'
						id='message'
						placeholder='Your Message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}></textarea>
				</div>
				<div className={Style.Submit}>
					<button>
						<div className={form === 'pending' ? Style.SlideButtonPending : Style.SlideButton}>
							{form === 'pending' ? (
								<div className={Style.Ellipsis}>
									<span className={Style.One}>.</span>
									<span className={Style.Two}>.</span>
									<span className={Style.Three}>.</span>
								</div>
							) : (
								<div>Submit</div>
							)}
						</div>
					</button>
					{form === 'submitted' && (
						<div className={Style.Submitted}>
							<p>Submitted. Thank you!</p>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
