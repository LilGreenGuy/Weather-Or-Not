import React from "react";
import { Card, Typography, List, ListItem, ListItemPrefix, Input } from "@/components/MTCustom";
import { UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SidebarWithSearch() {
	const [open, setOpen] = React.useState(0);
	const [openAlert, setOpenAlert] = React.useState(true);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	return (
		<Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl text-slate-900">
			<div className="mb-2 flex items-center gap-4 p-4">
				<img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
				<Typography variant="h5" color="ext-slate-900">
					Weather Or Not
				</Typography>
			</div>
			<div className="p-2">
				<Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
			</div>
			<List>
				<hr className="my-2 border-blue-gray-50" />
				<ListItem>
					<ListItemPrefix>
						<InboxIcon className="h-5 w-5" />
					</ListItemPrefix>
					Today's Weather
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<InboxIcon className="h-5 w-5" />
					</ListItemPrefix>
					Weekly Forecast
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<UserCircleIcon className="h-5 w-5" />
					</ListItemPrefix>
					Profile
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					Settings
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<PowerIcon className="h-5 w-5" />
					</ListItemPrefix>
					Log Out
				</ListItem>
			</List>
		</Card>
	);
}
