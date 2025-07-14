import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMember } from "@/lib/api";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <Image
            src={member.avatar_url || "/default-avatar.png"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col items-center">
        <CardTitle className="text-lg lg:text-xl mb-1 text-center group-hover:text-primary transition-colors duration-300">
          {member.name}
        </CardTitle>
        <p className="text-primary font-medium text-center">{member.position}</p>
        {member.department && (
          <p className="text-gray-500 text-xs text-center">{member.department}</p>
        )}
        <p className="mt-2 text-center text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
          {member.bio}
        </p>
        {member.skills && member.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {member.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-center gap-3">
        {member.linkedin_url && (
          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="w-5 h-5 text-blue-600 hover:text-blue-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
            </svg>
          </a>
        )}
        {member.github_url && (
          <a href={member.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg className="w-5 h-5 text-gray-800 dark:text-gray-200 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.297 24 17.797 24 12.5c0-6.63-5.373-12-12-12z"/>
            </svg>
          </a>
        )}
        {member.twitter_url && (
          <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg className="w-5 h-5 text-blue-400 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/>
            </svg>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
