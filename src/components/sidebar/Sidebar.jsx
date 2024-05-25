import { useState } from "react";
import SidebarHeader from "./header/SidebarHeader";
import { Notifications } from "./notifications";
import { Search } from "./search";
import { Conversation, Conversations } from "./conversations";
import SearchResults from "./search/SearchResults";

export default function Sidebar(onlineUsers, typing) {
  const [searchResults, setSearchResults] = useState([])

  return (
    <div className=" flex0030 max-w-[30%] h-full select-none">
      <SidebarHeader />
      <Notifications />
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          <Conversations onlineUsers={onlineUsers} typing={typing}/>
        </>
      )}
    </div>
  )
}
