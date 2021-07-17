from typing import List
import random

from dictators.dictators_game.models import User

# TODO
# chceme udrzovat lobby aj po zacati hry? aby sa hraci mohli po hre reconnectnut


PLAYER_COLORS = ["red", "blue", "green", "gold"]
MAX_PLAYERS = 4


class Player:
    def __init__(self, user, color):
        self.user: User = user
        self.color = color
        self.ready = False

    def as_json(self):
        return {
            'username': self.user.username,
            'color': self.color,
            'ready': self.ready
        }


class Lobby:
    def __init__(self):
        self.players: List[Player] = []
        self.game_started: bool = False
        self.free_colors: List[str] = PLAYER_COLORS[:]
        random.shuffle(self.free_colors)

    def _get_users(self) -> List[User]:
        return [player.user for player in self.players]

    def get_player(self, user: User) -> Player:
        # assuming that the given user is connected in the lobby
        return [player for player in self.players if player.user == user][0]

    def add_player(self, user: User) -> bool:
        # check if user isn't already in lobby and if MAX_PLAYERS isn't exceeded
        if user not in self._get_users() and len(self.players) < MAX_PLAYERS:
            self.players.append(Player(user, self.free_colors.pop()))
            return True
        return False

    def remove_player(self, user: User):
        player = [player for player in self.players if player.user == user][0]
        self.free_colors.append(player.color)
        self.players.remove(player)

    def all_ready(self):
        return all(player.ready for player in self.players)


temp_lobby = Lobby()
